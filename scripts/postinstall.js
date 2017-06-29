//    compile "com.google.android.gms:play-services-auth:10.2.6"
// buildToolsVersion "25.0.0"
// C:/git/mobile-app/node_modules/react-native-facebook-login/android/build.gradle
// C:/git/mobile-app/node_modules/react-native-firebase/android/build.gradle
// C:/git/mobile-app/node_modules/react-native-google-sign-in/android/build.gradle
// compile "com.google.android.gms:play-services-auth:10.2.6"

const path = require('path');
const replace = require('replace-in-file');
const options = {
    files: [
        path.resolve(__dirname, '../node_modules/react-native-facebook-login/android/build.gradle'),
        path.resolve(__dirname, '../node_modules/react-native-firebase/android/build.gradle'),
        path.resolve(__dirname, '../node_modules/react-native-google-sign-in/android/build.gradle')
    ],
    from: [/buildToolsVersion "(.*?)"/g, /compile "com\.google\.android\.gms:play-services-auth:(.*?)"/g],
    to: ['buildToolsVersion "25.0.0"', 'compile "com.google.android.gms:play-services-auth:10.2.6"'],

    //Multiple replacements with different strings (replaced sequentially)
    // from: [/foo/g, /baz/g],
    // to: ['bar', 'bax'],

    //Specify if empty/invalid file paths are allowed (defaults to false)
    //If set to true these paths will fail silently and no error will be thrown.
    allowEmptyPaths: false,

    //Character encoding for reading/writing files (defaults to utf-8)
    encoding: 'utf8',
};
try {
    const changedFiles = replace.sync(options);
    console.log('Modified files:', changedFiles.join(', '));
}
catch (error) {
    console.error('Error occurred:', error);
}
