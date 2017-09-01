
# Code G Exemption
[![Build Status](https://travis-ci.org/btbright/code-g.svg?branch=master)](https://travis-ci.org/btbright/code-g)

This tool is used to determine if a taxpayer is eligible for the Code G exemption from the Affordable Care Act Minimum Essential Coverage requirement. It uses state residency history, modified adjusted gross income, and dependent information to calculate how the taxpayer's income compares to the federal poverty line.

## Resources used
The following IRS instructions were used to define Household Income, Modified Adjusted Gross Income, and federal poverty lines:
Form 8965, Health Coverage Exemptions; Form 8962, Premium Tax Credit

## How to report an issue
We've worked hard to make sure the app provides accurate results in all cases but if you find an inaccurate result or bug, please let us know by opening an issue here on GitHub. We'll get it fixed as soon as we can. If you are a designed or developer, we'd also love pull requests or suggestions on how to improve the app.

## Privacy
No data entered into the wizard is saved in any way. The tool is hosted on [github pages](https://pages.github.com/) and does not communicate with any server after the resources needed are downloaded to the browser.

## How to run this project on your computer
To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/btbright/code-g

# Go into the repository
$ cd code-g

# Install dependencies
$ npm install

# Run the app
$ npm start

# Run tests
$ npm test
```

## How to add a new tax year
The years for the first question (tax year selection) are generated from the data found in `/src/constants/federalPovertyLineData.js`. To add a new year, add the limits to the `federalPovertyLineLevels` object with a new key for the year you are adding. Also, add the additional amount for family members above 8 to the `additionalFamilyMemberAmounts` object, also keyed by the new year you are adding. The data are found in the IRS instructions for Form 8962.

## Technical details
This is a front-end only app, so no taxpayer data entered is saved in any way. It was created with create-react-app and has not been ejected. For details on that process, if needed, see the documentation for CRA below.

  - [create-react-app](https://github.com/facebookincubator/create-react-app)
  - [React](https://facebook.github.io/react/)
  - [Redux](http://redux.js.org/)
  - [lodash](https://lodash.com)
  - [skeleton](http://getskeleton.com/)

## Who
Built by [@maegan_whiting](https://twitter.com/maegan_whiting) and [@btbright](https://twitter.com/btbright)

## License
MIT 2017 Maegan Whiting and Ben Bright
