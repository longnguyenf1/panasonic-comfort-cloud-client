
import { ComfortCloudClient } from '../src/ComfortCloudClient';
import { DataMode } from '../src/domain/enums';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Ensure axios.create is mocked
mockedAxios.create = jest.fn(() => mockedAxios);

describe('ComfortCloudClient - getDeviceHistoryData', () => {
    let client: ComfortCloudClient;

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();

        // Mock the create method to return the mocked axios instance
        // This is necessary because ComfortCloudClient creates its own instance
        // mockedAxios.create is already set up to return mockedAxios in the global scope setup

        client = new ComfortCloudClient();
        // Manually set a dummy token to avoid auth checks if any (although mocking axios should bypass it)
        client.oauthClient.token = 'dummy-token';
    });

    it('should send correct date and timezone when timezone is NOT provided', async () => {
        const testDate = new Date('2023-10-27T10:00:00.000+02:00'); // Oct 27, 2023, 10 AM, GMT+2
        const deviceGuid = 'test-guid';
        const expectedDateString = '20231027';
        // We expect the helper to calculate the timezone offset from the date object
        // NOTE: The Date object in JS keeps the local timezone of the system running the test usually, 
        // or UTC if created with 'Z'.
        // To properly test the "timezone of the date", we rely on what getTimezoneForHistoryData extracts.
        // If we want to verify the formatted timezone string, let's just check what the helper returns for this date.
        // Actually, let's trust our helper produces correct output for the system running the test, 
        // OR better: Spy on the helper? No, that's internal.
        // We will assert that the 'osTimezone' sent in body matches the pattern '±HH:MM'.

        const mockResponseData = {
            "temperatureUnit": 0,
            "deviceRegisterTime": "20200410",
            "historyDataList": [
                {
                    "dataTime": "20251219 00",
                    "averageSettingTemp": -255,
                    "averageInsideTemp": -255,
                    "averageOutsideTemp": -255,
                    "consumption": 0.04,
                    "cost": -255,
                    "heatConsumptionRate": 0,
                    "coolConsumptionRate": 0
                },
                {
                    "dataTime": "20251219 07",
                    "averageSettingTemp": 18,
                    "averageInsideTemp": -255,
                    "averageOutsideTemp": 12,
                    "consumption": 0.30800000000000005,
                    "cost": -255,
                    "heatConsumptionRate": 0.7759740259740259,
                    "coolConsumptionRate": 0
                }
            ]
        };

        mockedAxios.post.mockResolvedValue({ status: 200, data: mockResponseData });

        const result = await client.getDeviceHistoryData(deviceGuid, testDate, DataMode.Day);

        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        const [url, body, config] = mockedAxios.post.mock.calls[0];

        expect(url).toBe('/deviceHistoryData');
        expect((body as any)).toMatchObject({
            deviceGuid: deviceGuid,
            dataMode: DataMode.Day,
            date: expectedDateString,
        });

        // Verify timezone format
        expect((body as any).osTimezone).toMatch(/^[+-]\d{2}:\d{2}$/);

        // Verify result matches mock data
        expect(result).not.toBeNull();
        expect(result?.historyDataList.length).toBe(2);
        expect(result?.historyDataList[1].averageSettingTemp).toBe(18);
    });

    it('should use provided timezone if given', async () => {
        const testDate = new Date();
        const customTimezone = '+09:00';

        mockedAxios.post.mockResolvedValue({ status: 200, data: { success: true } });

        await client.getDeviceHistoryData('guid', testDate, DataMode.Day, customTimezone);

        const [url, body] = mockedAxios.post.mock.calls[0];
        expect((body as any).osTimezone).toBe(customTimezone);
    });
});
