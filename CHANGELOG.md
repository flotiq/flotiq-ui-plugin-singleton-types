# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1]

### Fixed
* Restrict the loader to the content type configured in the plugin settings. Previously, it was also applied to other content types, causing the singleton plugin to temporarily override the default table view. As a result, the table was unmounted and mounted again, causing the filter inputs to lose focus.

## [0.2.0]

### Added

- Issue templates
- Dependabot
- Flotiq logo and collaboration section in readme
- License
- GitHub check actions
- Changelog

### Changed

- Updated dependencies
