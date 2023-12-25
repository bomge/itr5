import { Faker, faker } from '@faker-js/faker';
import seedrandom from 'seedrandom';


faker.seed(1)
// let rng = seedrandom('hello');

export function genFaker(count, region,index=0){
    const newData = [];
    faker.locale = region;
    

    for(let i = 0; i < count; i++) {


      const item = {
        id: ++index,
        identifier: faker.datatype.uuid(),
        name: faker.name.fullName(), 
        address: faker.address.city(),
        phone: faker.phone.phoneNumber() 
      };

      newData.push(item);
    }

    return (newData);
}

export function changeFakerSeed(newSeed){
    faker.seed(+newSeed)
    // rng = seedrandom(newSeed);
}


function genPhone(faker){
    return Math.random() > 0.5 ? faker.phone.phoneNumberFormat() : faker.phone.phoneNumberFormat(3)
}
