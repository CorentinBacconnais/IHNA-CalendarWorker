exports.packageParseInformation= (packageJson) => {
    return {name: packageJson.name, version: packageJson.version}
}