import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const carPartsList = document.getElementById('carPartsList');
    const addCarPartForm = document.getElementById('addCarPartForm');

    // Function to render car parts
    const renderCarParts = async () => {
        const carParts = await backend.listCarParts();
        carPartsList.innerHTML = '';
        carParts.forEach(part => {
            const partElement = document.createElement('div');
            partElement.className = 'car-part';
            partElement.innerHTML = `
                <h3>${part.title}</h3>
                <p>CPID: ${part.cpid}</p>
                <p>${part.description}</p>
                <p>Stock: ${part.stock}</p>
                <p>Price: $${part.price.toFixed(2)}</p>
                ${part.imageUrl ? `<img src="${part.imageUrl}" alt="${part.title}">` : ''}
                <button onclick="deleteCarPart('${part.cpid}')">Delete</button>
            `;
            carPartsList.appendChild(partElement);
        });
    };

    // Function to add a new car part
    const addCarPart = async (event) => {
        event.preventDefault();
        const cpid = document.getElementById('cpid').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const stock = parseInt(document.getElementById('stock').value);
        const price = parseFloat(document.getElementById('price').value);
        const imageUrl = document.getElementById('imageUrl').value;

        await backend.addCarPart({
            cpid,
            title,
            description,
            stock,
            price,
            imageUrl: imageUrl ? [imageUrl] : []
        });

        addCarPartForm.reset();
        renderCarParts();
    };

    // Function to delete a car part
    window.deleteCarPart = async (cpid) => {
        await backend.deleteCarPart(cpid);
        renderCarParts();
    };

    // Event listeners
    addCarPartForm.addEventListener('submit', addCarPart);

    // Initial render
    renderCarParts();
});