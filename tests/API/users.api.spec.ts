import { request } from "node:http";
import { expect, test } from "../../src/fixtures/baseFixture"
import { userInfo } from "node:os";

let AUTH_TOKEN = { Authorization: 'Bearer 05f263a170c239b688ded51b28c781d21fb69e6ee34ff025cf81c274b099612a' }


test('Get: get user details', async ({ request }) => {

    let response = await request.get('https://gorest.co.in/public/v2/users/8537650', {
        headers: AUTH_TOKEN
    })

    const status = response.status();
    const statusText = response.statusText();
    const jsonBody = await response.json();
    console.log(`Status Code: ${status} \nStatus Text: ${statusText}`);
    console.log(jsonBody);
    expect(status, jsonBody).toBe(200);
})


test('Create a user test', async ({ request, testData }) => {

    let userName = testData.basicInfo.firstName + ' ' + testData.basicInfo.lastName
    let userEmail = await testData
        .basicInfo
        .email(testData.basicInfo.firstName + '_' + testData.basicInfo.lastName)
    let userGender = testData
        .basicInfo
        .gender

    let useData = {
        name: userName,
        email: userEmail,
        gender: userGender,
        status: 'active'
    }
    console.log(useData);

    let response = await request.post("https://gorest.co.in/public/v2/users", {
        headers: AUTH_TOKEN,
        data: useData
    })

    const status = response.status();
    const statusText = response.statusText();
    const jsonBody = await response.json();
    console.log(`Status Code: ${status} \nStatus Text: ${statusText}`);
    console.log(jsonBody);

})

test('Update a user: PUT call', async ({ request }) => {

    let userData = {
        name: 'Pooja Nair',
        email: 'poojanair_mr96sotq@testuser.com',
        gender: 'female',
        status: 'active'
    }

    let response = await request.put('https://gorest.co.in/public/v2/users/8538186', {
        headers: AUTH_TOKEN,
        data: userData
    })

    let status = response.status();
    let statusText = response.statusText();
    let jsonBody = await response.json();

    console.log(`Status Code: ${status} \nStatus Text: ${statusText}`);
    console.log(jsonBody);

})

test('Delecte the user: Delete', async ({ request }) => {

    let response = await request.delete('https://gorest.co.in/public/v2/users/8538186', {
        headers: AUTH_TOKEN
    })

    let status = response.status();
    let statusText = response.statusText();

    console.log(`Status Code: ${status} \nStatus Text: ${statusText}`);

})