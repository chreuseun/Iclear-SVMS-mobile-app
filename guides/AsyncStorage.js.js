try {
    await AsyncStorage.setItem('token', token);
} catch (error) {
    console.log('Error in storing data: ', error)
}

let value = null;

try {
    value = await AsyncStorage.getItem('token');
    if (value !== null) {
    // We have data!!
    console.log(value);
    }
} catch (error) {
}