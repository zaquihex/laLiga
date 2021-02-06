module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parser": "babel-eslint",
    "extends": "airbnb",
    "globals": {
        "Ext": true,
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "import/no-unresolved": "off",
        "import/no-extraneous-dependencies": 'off',
        "object-curly-newline": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/forbid-prop-types": "off",
        "no-confusing-arrow": "off",
        "no-useless-escape": "off",
        "max-len": "off",
        "jsx-a11y/label-has-associated-control": [ "error", {
            "required": {
                "some": [ "nesting", "id"  ]
            }
        }]
    }
};
