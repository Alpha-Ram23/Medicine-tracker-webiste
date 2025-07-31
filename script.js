async function searchMedicine() {
    const medicineName = document.getElementById('searchInput').value.trim();
    if (!medicineName) {
        alert("Please enter a medicine name.");
        return;
    }

    const response = await fetch(`/search?medicineName=${medicineName}`);
    const data = await response.json();

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "";

    if (data.length === 0) {
        resultDiv.innerHTML = "<p>No stores found for this medicine.</p>";
    } else {
        data.forEach(store => {
            const storeDiv = document.createElement("div");
            storeDiv.innerHTML = `
                <strong>${store.pharmacyName}</strong><br>
                <strong>Medicine:</strong> ${store.medicineName}<br>
                <strong>Dosage:</strong> ${store.dosage}<br>
                <strong>Purpose:</strong> ${store.purpose}<br>
                <strong>Available:</strong> ${store.available ? "Yes" : "No"}<br>
                <strong>Location:</strong> ${store.pharmacyLocation}<br>
                <strong>Contact:</strong> ${store.contactNumber}<br>
                <strong>Quantity:</strong> ${store.quantity}<br>
                <strong>Price:</strong> ₹${store.price}<hr>
            `;
            resultDiv.appendChild(storeDiv);
        });
    }
}
