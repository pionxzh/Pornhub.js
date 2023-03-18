# Changelog

## [1.3.1](https://github.com/pionxzh/Pornhub.js/compare/v1.3.0...v1.3.1) (2023-03-18)


### Bug Fixes

* `cup` should be lowercase in `pornstarList` ([422e463](https://github.com/pionxzh/Pornhub.js/commit/422e463bd967f938e31f33d33c0dbf0df8ea24fd))
* **deps:** update dependency urlcat to v3  ([#48](https://github.com/pionxzh/Pornhub.js/issues/48)) ([2647d10](https://github.com/pionxzh/Pornhub.js/commit/2647d1008e38be1e7c4cea718166b0e0b1f51b21))
* support search for gay pornstar list ([908d0f2](https://github.com/pionxzh/Pornhub.js/commit/908d0f2fba6621382dc45c9e6d17bbbfffdca253))

## [1.3.0](https://github.com/pionxzh/Pornhub.js/compare/v1.2.0...v1.3.0) (2023-03-18)


### Features

* support pornstar list `pornstarList` ([e4480af](https://github.com/pionxzh/Pornhub.js/commit/e4480af35540f6f85b71b711b646b8ea5c5b5084)), closes [#44](https://github.com/pionxzh/Pornhub.js/issues/44)

## [1.2.0](https://github.com/pionxzh/Pornhub.js/compare/v1.1.1...v1.2.0) (2023-02-27)


### Features

* support detecting illegal search and throw IllegalError ([dba13c5](https://github.com/pionxzh/Pornhub.js/commit/dba13c52ec026aebd74ae37890f4e5ff927bf94e)), closes [#45](https://github.com/pionxzh/Pornhub.js/issues/45)


### Bug Fixes

* output sourcemap ([4e2a08b](https://github.com/pionxzh/Pornhub.js/commit/4e2a08b776a87e729237ef3e4787e7c34b572b17))

## [1.1.1](https://github.com/pionxzh/Pornhub.js/compare/v1.1.0...v1.1.1) (2022-12-22)


### Bug Fixes

* apply fix broken esm `url` to all ([83fe317](https://github.com/pionxzh/Pornhub.js/commit/83fe3179d8d393611f76d9d836c34e80cb9b6aa8))
* fix broken esm `url` ([a8e16e3](https://github.com/pionxzh/Pornhub.js/commit/a8e16e37864f616ba8f9a71de46ebe683e62a194)), closes [#40](https://github.com/pionxzh/Pornhub.js/issues/40)
* prevent duplicate video title ([275ca5e](https://github.com/pionxzh/Pornhub.js/commit/275ca5edfa0feb7f777d44985335a39b19fd945d))

## [1.1.0](https://github.com/pionxzh/Pornhub.js/compare/v1.0.3...v1.1.0) (2022-12-04)


### Features

* automatically handle warmup for video ([ba7cd24](https://github.com/pionxzh/Pornhub.js/commit/ba7cd24e514d763340f05b9d9be42d78afb51ff4))
* support `awarded` and `premium` for both pstar and model ([aeed1bd](https://github.com/pionxzh/Pornhub.js/commit/aeed1bd59b466854020cdbab96317039cff22a1c))
* support `cover` image for both pstar and model ([5e6a56b](https://github.com/pionxzh/Pornhub.js/commit/5e6a56bcc0e5ed56bc70ae676e85be06f86ded40)), closes [#38](https://github.com/pionxzh/Pornhub.js/issues/38)
* support `uploadedVideoCount` and `taggedVideoCount` for both pstar and model ([1fc0f1e](https://github.com/pionxzh/Pornhub.js/commit/1fc0f1e2eb09d0d72c34052e2127867f5a422e4a))


### Bug Fixes

* improve the default value and filtering of model and pstar's `featuredIn` ([b0099e7](https://github.com/pionxzh/Pornhub.js/commit/b0099e78698d1bce9a1ba0080817217cec27605b))
* improve the default value of model and pstar's `avatar` ([47aa12b](https://github.com/pionxzh/Pornhub.js/commit/47aa12b75908589e026e85cb36879d48e6f6978f))
* prevent duplicate provider username ([3a3dc3b](https://github.com/pionxzh/Pornhub.js/commit/3a3dc3bdb94a47a03d99a2ebf48e8ebfbc3119b9))
* remove unused ModelSearchResult interface ([1e9ecf5](https://github.com/pionxzh/Pornhub.js/commit/1e9ecf5bd04491260ce9566c7962f01197ba91a2))

## [1.0.3](https://github.com/pionxzh/Pornhub.js/compare/v1.0.2...v1.0.3) (2022-12-03)


### Bug Fixes

* response of auto-complete might be empty ([6ce225e](https://github.com/pionxzh/Pornhub.js/commit/6ce225ea3e65499b7905e8afcb8f6e131371d42e)), closes [#35](https://github.com/pionxzh/Pornhub.js/issues/35)

## [1.0.2](https://github.com/pionxzh/Pornhub.js/compare/v1.0.1...v1.0.2) (2022-12-03)


### Bug Fixes

* fix video preview url always return empty ([50a3b2e](https://github.com/pionxzh/Pornhub.js/commit/50a3b2e6232f5346e10f14c9876835d88ebfc112)), closes [#33](https://github.com/pionxzh/Pornhub.js/issues/33)

## [1.0.1](https://github.com/pionxzh/Pornhub.js/compare/v1.0.0...v1.0.1) (2022-10-30)


### Bug Fixes

* downgrade node-fetch to 2.6.7 for cjs capability ([ba0d3b7](https://github.com/pionxzh/Pornhub.js/commit/ba0d3b7245d4e3a89a58319cd4ffd8a4e552a3cb)), closes [#30](https://github.com/pionxzh/Pornhub.js/issues/30)

## 1.0.0 (2022-10-23)


### ⚠ BREAKING CHANGES

* migrate to TypeScript

### Features

* migrate to TypeScript ([7014d11](https://github.com/pionxzh/Pornhub.js/commit/7014d11cc57d4818d428931343cddddd9b21fed8))
* support `autoComplete` and `searchModel`, `getToken` API, expose internal `Route` ([e19a1b8](https://github.com/pionxzh/Pornhub.js/commit/e19a1b849d918b97360d55b9fbdfd8d5950f541c))
* support pornstar page / model page ([37be912](https://github.com/pionxzh/Pornhub.js/commit/37be9122f33e2fa2518fa6d36019ce074ab2cc40))


### Bug Fixes

* 10 ([2ac2b60](https://github.com/pionxzh/Pornhub.js/commit/2ac2b6003751f3984526752fab74371c9a968127))
* export type interface ([7352de7](https://github.com/pionxzh/Pornhub.js/commit/7352de7684fbdfc9db685680e031fe177ffb1581))
* move avatar out of snapshot ([ab9299f](https://github.com/pionxzh/Pornhub.js/commit/ab9299f135e97e09d9d97657330e596f25701985))
