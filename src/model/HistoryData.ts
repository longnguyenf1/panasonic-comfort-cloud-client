export interface HistoryDataResponse {
    temperatureUnit: number
    deviceRegisterTime: string
    historyDataList: HistoryData[]
}

export interface HistoryData {
    dataTime: string
    /**
     * Average setting temperature.
     * -255 indicates no data.
     */
    averageSettingTemp: number
    /**
     * Average inside temperature.
     * -255 indicates no data.
     */
    averageInsideTemp: number
    /**
     * Average outside temperature.
     * -255 indicates no data.
     */
    averageOutsideTemp: number
    consumption: number
    cost: number
    heatConsumptionRate: number
    coolConsumptionRate: number
}
