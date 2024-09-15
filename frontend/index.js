import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const carPartsList = document.getElementById('carPartsList');
    const addCarPartForm = document.getElementById('addCarPartForm');
    const messageContainer = document.getElementById('messageContainer');

    // Function to show messages
    const showMessage = (message, isError = false) => {
        messageContainer.innerHTML = `<div class="message ${isError ? 'error' : 'success'}">${message}</div>`;
        setTimeout(() => {
            messageContainer.innerHTML = '';
        }, 5000);
    };

    // Function to render car parts
    const renderCarParts = async () => {
        try {
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
                    ${part.imageUrl ? `<img src="${part.imageUrl[0]}" alt="${part.title}">` : ''}
                    <button onclick="deleteCarPart('${part.cpid}')">Delete</button>
                `;
                carPartsList.appendChild(partElement);
            });
        } catch (error) {
            console.error('Error rendering car parts:', error);
            showMessage('Failed to load car parts. Please try again.', true);
        }
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

        try {
            await backend.addCarPart({
                cpid,
                title,
                description,
                stock,
                price,
                imageUrl: imageUrl ? [imageUrl] : []
            });
            addCarPartForm.reset();
            showMessage('Car part added successfully!');
            await renderCarParts();
        } catch (error) {
            console.error('Error adding car part:', error);
            showMessage('Failed to add car part. Please try again.', true);
        }
    };

    // Function to delete a car part
    window.deleteCarPart = async (cpid) => {
        try {
            await backend.deleteCarPart(cpid);
            showMessage('Car part deleted successfully!');
            await renderCarParts();
        } catch (error) {
            console.error('Error deleting car part:', error);
            showMessage('Failed to delete car part. Please try again.', true);
        }
    };

    // Event listeners
    addCarPartForm.addEventListener('submit', addCarPart);

    // Initial render
    renderCarParts();
});