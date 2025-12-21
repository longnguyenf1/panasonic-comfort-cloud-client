# Changelog

## [2.1.5] - 2025-12-21

### Fixed
- Fixed `getDeviceHistoryData` date formatting logic to always use `YYYYMMDD` format for `DataMode.Month` and `DataMode.Year`, resolving "Expected 1 arguments, but got 2" error and incorrect date format issues.

### Added
- Improved CLI error logging: Now catches errors and logs full `ServiceError` details, including `axios` response data, status, and headers for better debugging.
