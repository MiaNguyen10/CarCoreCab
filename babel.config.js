module.exports = {
  presets: [
    [ '@babel/env', { modules: false } ],
    [
      'next/babel',
      {
        'class-properties': {
          'loose': true,
        },
      }
    ]
  ],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    [ '@babel/plugin-proposal-decorators', { legacy: true } ],
    [ '@babel/plugin-proposal-class-properties', { loose: true } ],
    [ '@babel/plugin-proposal-private-methods', { loose: true } ],
    [ '@babel/plugin-proposal-private-property-in-object', { loose: true } ],
  ],
}
