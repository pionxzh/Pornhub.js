# Changelog

## [1.7.4](https://github.com/pionxzh/Pornhub.js/compare/v1.7.3...v1.7.4) (2023-08-27)


### Bug Fixes

* `set-cookie` should respect `Max-Age` and `Expires` ([d8473db](https://github.com/pionxzh/Pornhub.js/commit/d8473db655b0a4398b9c11abe2c5c3543126d435))
* fix expires paring ([61368a4](https://github.com/pionxzh/Pornhub.js/commit/61368a4764661be27af0faf86eb4d103778942bb))

## [1.7.3](https://github.com/pionxzh/Pornhub.js/compare/v1.7.2...v1.7.3) (2023-08-27)


### Bug Fixes

* improve debug log ([d5c71d3](https://github.com/pionxzh/Pornhub.js/commit/d5c71d37781b80b12673aab643a221d0dbae3426))
* prevent redirecting when fetching main page ([a11ef07](https://github.com/pionxzh/Pornhub.js/commit/a11ef075769658692c5b4a8a1cb6620d3f5c4f6d))
* update useragent to Chrome 116 ([a9bc54e](https://github.com/pionxzh/Pornhub.js/commit/a9bc54e18f79dac1174ec43de867b54ab0307eec))

## [1.7.2](https://github.com/pionxzh/Pornhub.js/compare/v1.7.1...v1.7.2) (2023-08-26)


### Bug Fixes

* **deps:** update dependency node-fetch to ^2.6.13 ([960c5c1](https://github.com/pionxzh/Pornhub.js/commit/960c5c12835ce2e71ba801325f09850ad29c93ad))
* **deps:** update dependency node-fetch to ^2.7.0 ([66c97ff](https://github.com/pionxzh/Pornhub.js/commit/66c97ff45c0262756ea25b38ef7ffbf95c559904))
* fix video premium detection ([af6994b](https://github.com/pionxzh/Pornhub.js/commit/af6994bb93d82c965ae8c3d7db1b720c0847dfe2))

## [1.7.1](https://github.com/pionxzh/Pornhub.js/compare/v1.7.0...v1.7.1) (2023-07-28)


### Bug Fixes

* fix request might not bring cookies correctly ([044709c](https://github.com/pionxzh/Pornhub.js/commit/044709c6a7d2937a8b1c6d8984e389d23f00d481))

## [1.7.0](https://github.com/pionxzh/Pornhub.js/compare/v1.6.0...v1.7.0) (2023-07-27)


### Features

* add `uploadDate` to VideoPage ([#76](https://github.com/pionxzh/Pornhub.js/issues/76)) ([6d42235](https://github.com/pionxzh/Pornhub.js/commit/6d422352916178ec64418968f15520a0bdfe11a8))
* add most recent uploaded video list to ModelPage, add method to get all model videos, fix Pager.isEnd ([#75](https://github.com/pionxzh/Pornhub.js/issues/75)) ([4e7880d](https://github.com/pionxzh/Pornhub.js/commit/4e7880d7c6ded73082aebaa301a0d850932cbdd5))
* expose cookie manipulation API set ([6c72ca7](https://github.com/pionxzh/Pornhub.js/commit/6c72ca7da3641ebde03243ebf8a0609ab0b4f60b))


### Bug Fixes

* add cookies for age confirmation bypass ([a3a6217](https://github.com/pionxzh/Pornhub.js/commit/a3a621778574ab9a72bb4274d1fda90c4e4519e9))
* add missing `url` for `randomVideo` ([8a3b17f](https://github.com/pionxzh/Pornhub.js/commit/8a3b17f6d4ef47c81d56c98c4e6d60c9f2f405a3))
* error handling for ld+json parsing ([e62a063](https://github.com/pionxzh/Pornhub.js/commit/e62a063c0f473bb990bf6dc7117bef834daa6554))
* prevent NaN in paging ([b3435f2](https://github.com/pionxzh/Pornhub.js/commit/b3435f2a8287f521f3d17277cbf20500cd6e7de0))

## [1.6.0](https://github.com/pionxzh/Pornhub.js/compare/v1.5.1...v1.6.0) (2023-07-20)


### Features

* add `id` to video search response to align with video page ([88ebf8b](https://github.com/pionxzh/Pornhub.js/commit/88ebf8bd5ea894b389075ab3e63b9419dada3597))
* add `preview` for video page response to align with video search ([6f888b9](https://github.com/pionxzh/Pornhub.js/commit/6f888b993d6edd3fbd2d8c969ce4793feab756d7))
* add `url` to video page response to align with video search ([d6d585f](https://github.com/pionxzh/Pornhub.js/commit/d6d585f00ab3da501a69611169c55a7864cb17e4))
* HttpStatusError now will contains url ([c9400ae](https://github.com/pionxzh/Pornhub.js/commit/c9400ae98a55cb6e50c57e3a158e0c6b8016c3ba))


### Bug Fixes

* `rating` shouldn't be `NaN` when vote is 0 ([9f26392](https://github.com/pionxzh/Pornhub.js/commit/9f263929a20aec987c5b8d3a95cba0ffb7508a75))

## [1.5.1](https://github.com/pionxzh/Pornhub.js/compare/v1.5.0...v1.5.1) (2023-07-13)


### Bug Fixes

* bypass age confirmation for european users ([c672702](https://github.com/pionxzh/Pornhub.js/commit/c672702df01133a2f2d9d3844035d71ba18dff05)), closes [#67](https://github.com/pionxzh/Pornhub.js/issues/67)

## [1.5.0](https://github.com/pionxzh/Pornhub.js/compare/v1.4.0...v1.5.0) (2023-07-08)


### Features

* support `.recommendedVideos` to parse videos from `/recommended` ([f1f3cbf](https://github.com/pionxzh/Pornhub.js/commit/f1f3cbfdb8718dec522e9d6945c0f86747644092))
* support `/gay` sexualOrientation for `.searchPornstar` ([c8d92f4](https://github.com/pionxzh/Pornhub.js/commit/c8d92f402b5cdd07b6997376d06e393db7cf3044))
* support `/gay` sexualOrientation for `.videoList`, `.searchVideo`and `.recommendedVideos` ([8976edb](https://github.com/pionxzh/Pornhub.js/commit/8976edb559c238cf3ecd1827fc787e03572b0f91)), closes [#54](https://github.com/pionxzh/Pornhub.js/issues/54)


### Bug Fixes

* add missing `country` prop for `.videoList` ([bf80129](https://github.com/pionxzh/Pornhub.js/commit/bf80129f88736f3e09d5e1032405726e559372f4))

## [1.4.0](https://github.com/pionxzh/Pornhub.js/compare/v1.3.2...v1.4.0) (2023-07-07)


### Features

* convert `id` type in `webMaster.getCategories` from `string` to `number` ([050f12e](https://github.com/pionxzh/Pornhub.js/commit/050f12ec94d3a3b9b787bf4ad967968a513e4249))
* convert `id` type in `webMaster.getCategories` to `string | number` ([e2ee66e](https://github.com/pionxzh/Pornhub.js/commit/e2ee66efe191a3f038dd489baffd682c1c3707b6))
* support `.randomVideo` to parse video from `/random` ([f1f929b](https://github.com/pionxzh/Pornhub.js/commit/f1f929b5532a503b73fd978bcf1a0619d2a4d482)), closes [#62](https://github.com/pionxzh/Pornhub.js/issues/62)
* support `.videoList()` to parse videos from `/video` ([4c51fb2](https://github.com/pionxzh/Pornhub.js/commit/4c51fb27a7599e06f69ab18af2f06fa41926769b))
* support passing `period` to `searchVideo` ([0237070](https://github.com/pionxzh/Pornhub.js/commit/0237070a42da4f9be5a208042a6fa3a5dd18cad8)), closes [#59](https://github.com/pionxzh/Pornhub.js/issues/59)


### Bug Fixes

* **deps:** update dependency node-fetch to ^2.6.11 ([24f57e4](https://github.com/pionxzh/Pornhub.js/commit/24f57e44abc530d48d68e7320eef9e13c2923348))
* **deps:** update dependency node-fetch to ^2.6.12 ([6d03346](https://github.com/pionxzh/Pornhub.js/commit/6d0334602d4aaa6d09925256c687bb8076855485))
* prevent detect incorrect social link from nav bar for `.model` and `.pornstar` ([57f57fd](https://github.com/pionxzh/Pornhub.js/commit/57f57fd6b2f7cba71da3591a245ea02c2dc001ed))

## [1.3.2](https://github.com/pionxzh/Pornhub.js/compare/v1.3.1...v1.3.2) (2023-04-07)


### Bug Fixes

* mark `videos` video download as deprecated ([304f221](https://github.com/pionxzh/Pornhub.js/commit/304f22109c4e405d07d78671a093de5b9690f6bd))

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
