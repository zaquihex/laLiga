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
        "react/jsx-first-prop-new-line": "off",
        "react/jsx-max-props-per-line": "off",
        "react/forbid-prop-types": "off",
        "react/jsx-closing-bracket-location": "off",
        "no-confusing-arrow": "off",
        "no-nested-ternary": "off",
        "no-useless-escape": "off",
        "operator-linebreak": "off",
        "import/no-named-as-default": "off",
        "react/jsx-wrap-multilines": "off",
        "camelcase": "off",
        "react/jsx-props-no-spreading": "off",
        "max-len": "off",
        "jsx-a11y/label-has-associated-control": [ "error", {
            "required": {
                "some": [ "nesting", "id"  ]
            }
        }]
    }
};
