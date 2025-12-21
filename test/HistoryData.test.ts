
import { ComfortCloudClient } from '../src/ComfortCloudClient';
import { DataMode } from '../src/domain/enums';
import axios from 'axios';
import { mockHistoryResponse } from './fixtures.js';

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

        mockedAxios.post.mockResolvedValue({ status: 200, data: mockHistoryResponse });

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

    it('should throw error for DataMode.Year', async () => {
        const testDate = new Date('2023-10-27T10:00:00.000+02:00');
        const deviceGuid = 'test-guid';

        await expect(client.getDeviceHistoryData(deviceGuid, testDate, DataMode.Year))
            .rejects
            .toThrow('DataMode Year and Week are currently not supported');
    });

    it('should format date correctly for DataMode.Month', async () => {
        const testDate = new Date('2023-10-27T10:00:00.000+02:00');
        const deviceGuid = 'test-guid';
        const expectedDateString = '202310'; // YearMonth

        mockedAxios.post.mockResolvedValue({ status: 200, data: mockHistoryResponse });

        await client.getDeviceHistoryData(deviceGuid, testDate, DataMode.Month);

        const [url, body] = mockedAxios.post.mock.calls[0];
        expect((body as any).date).toBe(expectedDateString);
        expect((body as any).dataMode).toBe(DataMode.Month);
    });
});
