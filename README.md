# panasonic-comfort-cloud-client

[![npm version](https://img.shields.io/npm/v/panasonic-comfort-cloud-client.svg?style=flat-square)](https://www.npmjs.com/package/panasonic-comfort-cloud-client)
[![Node.js CI](https://github.com/marc2016/panasonic-comfort-cloud-client/actions/workflows/nodejs.yml/badge.svg)](https://github.com/marc2016/panasonic-comfort-cloud-client/actions/workflows/nodejs.yml)


Panasonic Comfort Cloud Client for node.js to control air conditioning systems over REST API. This library uses the same endpoints as the mobile app [Panasonic Comfort Cloud](https://play.google.com/store/apps/details?id=com.panasonic.ACCsmart).

## Features

- get information of the air conditioning devices
- get Groups of the devices
- set parameter of devices

## Installing

Using npm:

```bash
$ npm install panasonic-comfort-cloud-client
```

Using yarn:

```bash
$ yarn add panasonic-comfort-cloud-client
```

## Example

### Login

```js
import { ComfortCloudClient } from 'panasonic-comfort-cloud-client'

await client.login(username, password)
```

Login to Panasonic Comfort Cloud with username and password will return a random token. This token is stored internally in a variable and sent with every request.

### Groups and Devices

```js
import {
  Device,
  Group,
  ComfortCloudClient,
} from 'panasonic-comfort-cloud-client'

await client.login(username, password)
// List of groups representing different homes, containing a list of devices
const groups = await client.getGroups()
// Get device by guid. Containing readable and writable properties.
const device = await comfortCloudClient.getDevice(guid)
```

### Writable properties of device

```js
import {
  Device,
  ComfortCloudClient,
  //enums for writable properties
  Power,
  AirSwingLR,
  AirSwingUD,
  FanAutoMode,
  EcoMode,
  OperationMode,
  FanSpeed,
} from 'panasonic-comfort-cloud-client'

await client.login(username, password)
const device = await comfortCloudClient.getDevice(guid)
// writable properties of device. Use the enums for the correct numbers.
device.operate = Power.On
device.operationMode = OperationMode.Auto
device.ecoMode = EcoMode.Auto
device.temperatureSet = 22
device.airSwingUD = AirSwingUD.Mid
device.airSwingLR = AirSwingLR.Mid
device.fanAutoMode = FanAutoMode.AirSwingAuto
device.fanSpeed = FanSpeed.Auto

// use parameter setter to send specific properties or use the device setter to send all parameter
await comfortCloudClient.setParameters(device.guid, device.parameters)
await comfortCloudClient.setDevice(device)
```

### History Data

```js
import {
  ComfortCloudClient,
  DataMode
} from 'panasonic-comfort-cloud-client'

// ... login ...

// Get history data for specific device (Day, Week, Month, Year)
const history = await client.getDeviceHistoryData(device.guid, new Date(), DataMode.Day)
```

## CLI

The package comes with a command line interface to control your devices or debug the API.

```bash
$ comfort-cloud-client-cli
```
or if you haven't installed it globally:
```bash
$ npx panasonic-comfort-cloud-client
```
Follow the interactive prompts to login and control your devices.

### Usage Example

```bash
? App Version (default: 1.20.0) 1.21.0
? Username myemail@example.com
? Password [hidden]
Login successful.
? Select a package manager Get groups
Found 1 groups.
? Select a group My Home
Found 2 devices.
? Select a device or print group Living Room AC
? Select command for device Living Room AC. Get history
? Select data mode Day
{
  "energyConsumptionHeating": 0,
  "energyConsumptionCooling": 2.5,
  ...
}
```

## Changelog

### 2.1.3
*   **Feature:** Allow selecting DataMode (Day, Week, Month, Year) in CLI history command.

### 2.1.2
*   **Fix:** Added check to filter out invalid devices (e.g. Heat Pumps) that do not provide parameters, preventing crashes (PR #22).

### 2.1.1
*   **Feature:** Added `getDeviceHistoryData` with full type support (`HistoryDataResponse`) for better developer experience.
*   **Feature:** CLI now prompts for App Version on startup (defaults to current known version).
*   **Fix:** Corrected various types and examples in `README.md`.
*   **Fix:** Improved timezone handling in history data requests.
*   **Internal:** Major test refactoring: Switched to full mocking (removed dependency on `auth_data.json`), extracted fixtures, and added realistic data scenarios.

### 2.1.0
*   **Feature:** Support for login with refresh token.
*   **Feature:** Added `CFCGenerator`.

### 2.0.x
*   **Feature:** Added OAuth support.
*   **Feature:** Introduced Command Line Interface (CLI).
*   **Tech:** Upgrade to ES2022.
*   **Fix:** Auto-refresh token fixes.

### 1.1.0
*   **Feature:** Added support for inside/outside temperature.
*   **Feature:** Added support for nanoe mode.

## License

[MIT](LICENSE)
