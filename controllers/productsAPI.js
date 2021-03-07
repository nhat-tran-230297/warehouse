import axios from 'axios';

const baseURL = 'https://bad-api-assignment.reaktor.com/v2';

// fetch the products => return array [products], i.e [glove1, glove2, ...]
const fetchProducts = async (category) => {
    const url = `${baseURL}/products/${category}`;

    const res = await axios.get(url, {
        headers: {
            // 'x-force-error-mode': 'all'
        }
    });
    const productsList = await res.data;

    return productsList
}

// fetching manufacturers => return array [products] of a manufacturer
const fetchManufacturers = async (manufacturer) => {
    const url = `${baseURL}/availability/${manufacturer}`;
    let res = await axios.get(url, {
        // headers: { 'x-force-error-mode': 'all'}
    })

    let data = await res.data.response

    // the api response is often '' or '[]', fetch until return a valid response
    while (!data || data === '[]') {
        console.log(`Empty array. Fetch again '${manufacturer}'`);
        res = await axios.get(url, {
            headers: {
            }
        });
        data = await res.data.response;
    }

    data = await res.data.response;
    console.log(`Finish fetching '${manufacturer}'`);
    return data;
}

// set the availability by filtering both the products list and manufacturer's items list
const setAvailability = (productsList, manufacturersProducts) => {
    for (let product of productsList) {
        const searchProduct = manufacturersProducts
            .filter((m) => (m.manufacturer === product.manufacturer))[0]
            .products
            .filter((p) => p.id === product.id)[0];
        if (searchProduct){
            product['availability'] = searchProduct.availability;
        } else {
            product['availability'] = 'UNDEFINED'
        }
        
    }   
}

// get the availability of each product and display to the UI
const getProductsWithAvailability = async () => {
    const glovesList = await fetchProducts('gloves');
    const facemasksList = await fetchProducts('facemasks');
    const beaniesList = await fetchProducts('beanies');

    // find the list of unique manufacturers of (gloves, facemasks, beanies)
    const manufacturers = [...new Set([
        ...glovesList.map(product => product.manufacturer),
        ...facemasksList.map(product => product.manufacturer),
        ...beaniesList.map(product => product.manufacturer),
    ])];

    // filtering and cleaning the data to get the availability of the product
    const manufacturersProducts = manufacturers.map(async (m) => {
        const data = await fetchManufacturers(m);
        let cleanedData;

        if ((data) && (data !== '[]')) {
            cleanedData = data.map((product) => {
                return {
                    'id': product.id.toLowerCase(),
                    'availability': product.DATAPAYLOAD.match(/<INSTOCKVALUE>(.*?)<\/INSTOCKVALUE>/)[1]
                }
            })
        } else {
            cleanedData = [];
        }

        return {
            'manufacturer': m,
            'products': cleanedData
        }
    });

    const manufacturersPromise = await Promise.all(manufacturersProducts);

    setAvailability(glovesList, manufacturersPromise);
    setAvailability(facemasksList, manufacturersPromise);
    setAvailability(beaniesList, manufacturersPromise);

    return {
        'gloves': glovesList,
        'facemasks': facemasksList,
        'beanies': beaniesList
    }

}

// update cache
const updateCache = async (cache) => {
    const data = await getProductsWithAvailability();
    
    // update cache
    cache.set('products', data);
    console.log('cache updated')
}


const test = async () => {
    const res = await axios.get('https://bad-api-assignment.reaktor.com/v2/availability/okkau');
    const data = await res.data.response

    return data[0];
}

export { updateCache, test, getProductsWithAvailability }