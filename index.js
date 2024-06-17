fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const countrySelect = document.getElementById('selectCountry');
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = '搜尋國家';
        countrySelect.parentNode.insertBefore(searchInput, countrySelect);

        const sortedCountries = data.sort((a, b) => {
            const nameA = a.name.common.toUpperCase();
            const nameB = b.name.common.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        const addOptions = (countries) => {
            countrySelect.innerHTML = '<option value="">選擇國家</option>';
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name.common;
                option.textContent = country.name.common;
                countrySelect.appendChild(option);
            });
        };

        addOptions(sortedCountries);

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredCountries = sortedCountries.filter(country =>
                country.name.common.toLowerCase().includes(searchTerm)
            );
            addOptions(filteredCountries);
        });

        countrySelect.addEventListener('change', () => {
            const selectedCountry = countrySelect.value;
            if (selectedCountry) {
                window.location.href = `country.html?name=${selectedCountry}`;
            }
        });
    })
    .catch(error => console.error('Error fetching country data:', error));
