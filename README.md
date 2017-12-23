[![npm](https://img.shields.io/npm/v/start-backfill-data.svg?style=flat-square)](https://www.npmjs.com/package/start-backfill-data)
[![Build Status](https://img.shields.io/travis/fmal/start-backfill-data/master.svg?style=flat-square)](http://travis-ci.org/fmal/start-backfill-data)
[![codecov coverage](https://img.shields.io/codecov/c/gh/fmal/start-backfill-data.svg?style=flat-square)](https://codecov.io/gh/fmal/start-backfill-data)

# start-backfill-data

[Start runner](https://github.com/start-runner/start
) task for back-filling missing fields across JSON files.

```
npm install start-backfill-data --save-dev
```

## Usage

```js
import Start from 'start';
import reporter from 'start-pretty-reporter';
import files from 'start-files';
import backfillData from 'start-backfill-data';

const start = Start(reporter());

export const task = () => start(
  files('assets/translations/*.json'),
  backfillData()
);
```