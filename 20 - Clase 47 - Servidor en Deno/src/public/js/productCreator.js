const form = document.getElementById('productForm');

form.addEventListener('submit', async evt => {
    evt.preventDefault();
    const data = new FormData(form);
    const response = await fetch('/products/', {
        method: 'POST',
        body: data
    });
    const result = await response.json();
    console.log(result);
})