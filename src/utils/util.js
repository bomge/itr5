export function deleteRandomCharacter(text) {
    if(!text || !text.length) return
    const index = Math.floor(Math.random() * text.length);
    return text.slice(0, index) + text.slice(index + 1);  
  }
export  function addRandomCharacter(text='', characters) {
    // if(!text || !text.length) return
    const char = characters[Math.floor(Math.random() * characters.length)];  
    const index = Math.floor(Math.random() * text.length);
    
    return text.slice(0, index) + char + text.slice(index);
  }
  
export   function swapRandomCharacters(text) {
    if(!text || !text.length || text.length<3) return
    const indexA = Math.floor(Math.random() * text.length);
    let indexB = indexA;
    while(indexB === indexA) {
      indexB = Math.floor(Math.random() * text.length);
    }
    
    const chars = text.split('');  
    const temp = chars[indexA];
    chars[indexA] = chars[indexB];
    chars[indexB] = temp;
  
    return chars.join(''); 
  }
 export const deepClone = (arr) => {
    return arr.map((item) => Array.isArray(item) ? deepClone(item) : { ...item });
  };

export const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'