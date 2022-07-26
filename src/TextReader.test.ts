test('reads pdf text from a page', async () => {
    const response = await fetch('http://localhost:3001/public/logo192.png');
    const body = await response.json();
    expect(response.status === 200).toBeTruthy();
    console.log(body);
});