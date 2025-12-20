
import { ComfortCloudClient } from '../src/ComfortCloudClient.js'
import { Group } from '../src/model/Group.js'
import { Device } from '../src/model/Device.js'
import { OAuthClient } from '../src/OAuthClient.js'
import { Power, OperationMode, EcoMode, AirSwingUD, AirSwingLR, FanAutoMode, FanSpeed } from '../src/domain/enums.js'
import axios from 'axios'
import { mockGroupResponse, mockDeviceResponse } from './fixtures.js'

// Mock axios for ComfortCloudClient calls
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock OAuthClient class
jest.mock('../src/OAuthClient.js');
const MockedOAuthClient = OAuthClient as jest.MockedClass<typeof OAuthClient>;

describe('ComfortCloudClient Tests', () => {
  let client: ComfortCloudClient;
  const dummyToken = 'dummy-token';
  const dummyRefreshToken = 'dummy-refresh-token';
  const dummyClientId = 'dummy-client-id';

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup MockedOAuthClient implementation
    MockedOAuthClient.mockImplementation(() => {
      return {
        oAuthProcess: jest.fn().mockResolvedValue(dummyToken),
        refreshToken: jest.fn().mockResolvedValue(dummyToken),
        token: dummyToken,
        tokenRefresh: dummyRefreshToken
      } as unknown as OAuthClient;
    });

    // Mock axios.create to return the mocked instance
    // Note: ComfortCloudClient uses this instance
    mockedAxios.create = jest.fn(() => mockedAxios);

    client = new ComfortCloudClient();
  });

  test('login', async () => {
    const username = 'testuser';
    const password = 'testpassword';

    // Mock getClientId call
    mockedAxios.post.mockResolvedValueOnce({
      status: 200,
      data: { clientId: dummyClientId }
    });

    await client.login(username, password);

    // Verify OAuth process was called
    expect(client.oauthClient.oAuthProcess).toHaveBeenCalledWith(username, password);

    // Verify clientId was fetched
    expect(mockedAxios.post).toHaveBeenCalledWith(
      '/auth/v2/login',
      expect.anything(),
      expect.anything()
    );
  });

  test('refreshToken', async () => {
    const username = 'testuser';
    const password = 'testpassword';

    // Setup initial client
    mockedAxios.post.mockResolvedValueOnce({ status: 200, data: { clientId: dummyClientId } });
    await client.login(username, password);

    // Setup clean mocks for refresh test
    jest.clearAllMocks();

    const clientRefreshToken = new ComfortCloudClient();

    // Mock refresh token flow
    // 1. refreshToken called on OAuthClient
    // 2. getClientId called via axios
    mockedAxios.post.mockResolvedValueOnce({ status: 200, data: { clientId: dummyClientId } });

    await clientRefreshToken.login('', '', dummyRefreshToken);

    expect(clientRefreshToken.oauthClient.refreshToken).toHaveBeenCalledWith(dummyRefreshToken);
    expect(mockedAxios.post).toHaveBeenCalledWith('/auth/v2/login', expect.anything(), expect.anything());
  });

  test('getGroups', async () => {
    // Setup logged in state
    client.oauthClient.token = dummyToken;

    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockGroupResponse
    });

    const groups = await client.getGroups();

    expect(groups.length).toBe(1);
    expect(groups[0] instanceof Group).toBeTruthy();
    expect(groups[0].name).toBe('Home');
    expect(groups[0].devices.length).toBe(5);

    // Check first device (Kitchen)
    expect(groups[0].devices[0]).toBeDefined();
    expect(groups[0].devices[0].guid).toBe('dev1-kitchen');
    expect(groups[0].devices[0].name).toBe('Kitchen');
    expect(groups[0].devices[0].temperatureSet).toBe(24);

    // Check last device (Kids Room)
    expect(groups[0].devices[4].guid).toBe('dev5-kids');
    expect(groups[0].devices[4].name).toBe('Kids Room');
    expect(groups[0].devices[4].operate).toBe(0); // Off
  });

  test('getDevice', async () => {
    const deviceGuid = 'device1';

    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockDeviceResponse
    });

    const device = await client.getDevice(deviceGuid);

    expect(device).not.toBeNull();
    expect(device?.guid).toBe(deviceGuid);
    expect(device?.temperatureSet).toBe(22);
  });

  test('setDevice', async () => {
    // Mock getDevice first to have a device object
    const deviceGuid = 'device1';
    // We don't actually need to call getDevice to create a device object
    const device = new Device(deviceGuid, 'Test Device');
    device.temperatureSet = 22;
    device.operate = Power.On;

    // Mock setDevice call
    mockedAxios.post.mockResolvedValue({
      data: { success: true }
    });

    await client.setDevice(device);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    const [url, body] = mockedAxios.post.mock.calls[0];
    expect(url).toBe('/deviceStatus/control');
    expect((body as any).deviceGuid).toBe(deviceGuid);
    expect((body as any).parameters.temperatureSet).toBe(22);
  });

});
