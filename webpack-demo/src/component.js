export default (text = 'Hello World') => {
    const element = document.createElement('div');
    element.innerHTML = text + 'at'+ (new Date()).toString();
    
    return element;
}