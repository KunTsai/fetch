const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('name');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            const country = data[0];
            const nativeName = country.translations.zho ? country.translations.zho.common : '';

            document.getElementById('countryName').textContent = `${country.name.common} (${nativeName})`;

            const countryFlag = document.getElementById('countryFlag');
            countryFlag.src = country.flags.png;
            countryFlag.alt = `${country.name.common} Flag`;

            const formattedArea = country.area.toLocaleString();
            const formattedPopulation = country.population.toLocaleString();

            const countryDetails = document.getElementById('countryDetails');
            countryDetails.innerHTML = `
                <ul>
                    <li><strong>所在地區:</strong> ${country.region}</li>
                    <li><strong>首都:</strong> ${country.capital ? country.capital[0] : 'N/A'}</li>
                    <li><strong>分區:</strong> ${country.subregion}</li>
                    <li><strong>語言:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</li>
                    <li><strong>面積:</strong> ${formattedArea} km²</li>
                    <li><strong>人口:</strong> ${formattedPopulation} 人</li>
                    <li><strong>時區:</strong> ${country.timezones.join(', ')}</li>
                    <li><strong>簡介:</strong> <a href="https://www.google.com/maps/place/${country.name.common}/" target="_blank">查看Google地圖</a></li>
                </ul>
            `;
        } else {
            document.getElementById('countryDetails').textContent = 'Country details not found.';
        }
    })
    .catch(error => console.error('Error fetching country details:', error));
