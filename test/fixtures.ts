
export const mockGroupResponse = {
    groupList: [
        {
            groupId: 66666,
            groupName: 'Home',
            deviceList: [
                {
                    deviceGuid: 'dev1-kitchen',
                    deviceName: 'Kitchen',
                    parameters: {
                        operate: 1,
                        operationMode: 3,
                        temperatureSet: 24,
                        fanSpeed: 0,
                        fanAutoMode: 1,
                        airSwingLR: 0,
                        airSwingUD: 0,
                        ecoFunctionData: 0,
                        ecoMode: 0,
                        ecoNavi: 1,
                        nanoe: 0,
                        iAuto: 0,
                        airDirection: 0,
                        lastSettingMode: 0,
                        airQuality: 0,
                    }
                },
                {
                    deviceGuid: 'dev2-living',
                    deviceName: 'Living Room',
                    parameters: {
                        operate: 1,
                        operationMode: 3,
                        temperatureSet: 23,
                        fanSpeed: 0,
                        fanAutoMode: 0,
                        airSwingLR: 2,
                        airSwingUD: 0,
                        ecoFunctionData: 0,
                        ecoMode: 0,
                        ecoNavi: 1,
                        nanoe: 0,
                        iAuto: 0,
                        airDirection: 0,
                        lastSettingMode: 0,
                        airQuality: 0,
                    }
                },
                {
                    deviceGuid: 'dev3-office',
                    deviceName: 'Office',
                    parameters: {
                        operate: 1,
                        operationMode: 3,
                        temperatureSet: 24,
                        fanSpeed: 0,
                        fanAutoMode: 0,
                        airSwingLR: 2,
                        airSwingUD: 0,
                        ecoFunctionData: 0,
                        ecoMode: 0,
                        ecoNavi: 1,
                        nanoe: 0,
                        iAuto: 0,
                        airDirection: 0,
                        lastSettingMode: 0,
                        airQuality: 0,
                    }
                },
                {
                    deviceGuid: 'dev4-guest',
                    deviceName: 'Guest Room',
                    parameters: {
                        operate: 0,
                        operationMode: 3,
                        temperatureSet: 22,
                        fanSpeed: 3,
                        fanAutoMode: 0,
                        airSwingLR: 2,
                        airSwingUD: 0,
                        ecoFunctionData: 0,
                        ecoMode: 0,
                        ecoNavi: 1,
                        nanoe: 0,
                        iAuto: 0,
                        airDirection: 0,
                        lastSettingMode: 0,
                        airQuality: 0,
                    }
                },
                {
                    deviceGuid: 'dev5-kids',
                    deviceName: 'Kids Room',
                    parameters: {
                        operate: 0,
                        operationMode: 3,
                        temperatureSet: 21,
                        fanSpeed: 0,
                        fanAutoMode: 0,
                        airSwingLR: 2,
                        airSwingUD: 0,
                        ecoFunctionData: 0,
                        ecoMode: 0,
                        ecoNavi: 1,
                        nanoe: 0,
                        iAuto: 0,
                        airDirection: 0,
                        lastSettingMode: 0,
                        airQuality: 0,
                    }
                }
            ]
        }
    ]
};

export const mockHistoryResponse = {
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

export const mockDeviceResponse = {
    parameters: {
        operate: 1,
        operationMode: 2,
        temperatureSet: 22
    }
};
