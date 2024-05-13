import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const options = {
    method: 'POST',
    url: BASE_URL,
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.REACT_APP_COMPILER_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_COMPILER_HOST
    },
    data: {
      language: 'python3',
      version: 'latest',
      code: 'print("Hello, World!");',
      input: null
    }
  };

export const fetchFromAPI = async ({lang,code,input}) => {
    options.data.code=code
    options.data.language=lang
    options.data.input=input
    // console.log(options.data.language)
    const response = await axios.request(options);

    // console.log(response)

    return response.data;
}

// https://rapidapi.com/Glavier/api/online-code-compiler