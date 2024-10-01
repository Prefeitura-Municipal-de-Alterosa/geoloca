function doGet(e) {
    var action = e.parameter.action;
  
    switch(action) {
      case "Read":
        return Read(e);
      // Outras ações...
      default:
        return ContentService.createTextOutput("Invalid action").setMimeType(ContentService.MimeType.TEXT);
    }
  }
  
  function Read(e) {
    var sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/13uxVghXgOGUI-_LQMRfAkN7jCEuCzOCY1EcuhwCGNdw/edit#gid=0').getSheetByName('Página1');
    var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  
    var data = rows.map(function(row) {
      return {
        'nome': row[0],
        'date': row[1],
        'datetime': row[2],
        'lat': row[3],
        'lon': row[4],
        'registro': row[5],
        'distance': row[6]
      };
    });
  
    var result = JSON.stringify(data);
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
  }
  function handleSubmit(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    const vehicleName = document.getElementById('vehicleName').value;
    const reportDate = document.getElementById('reportDate').value;
    
    // Chama a função do JavaScript passando os dados do formulário
    funcaoDoJavaScript(vehicleName, reportDate);
}

function funcaoDoJavaScript(vehicleName, reportDate) {
    // Lógica para processar os dados recebidos
    console.log(`Nome do Veículo: ${vehicleName}`);
    console.log(`Data do Relatório: ${reportDate}`);
    // Adicione aqui a lógica necessária para gerar o relatório
}
/////////////////////////////////// select //////////////////////////////////
async function searchData() {
const vehicleName = document.getElementById('vehicleName').value;
const reportDate = document.getElementById('reportDate').value;

if (!vehicleName || !reportDate) {
    alert('Por favor, selecione um nome de veículo e uma data.');
    return;
}

try {
    // Requisição para obter todos os registros
    const response = await fetch('https://script.google.com/macros/s/AKfycbzYvB9zfP9R400y0iiUnhn9Uqx1q-rbZ1EKLkFG1v_hnl-qj5MqxuInU3vPD8LH2Dsk/exec?action=Read');
    const data = await response.json();

    // Filtra os dados de acordo com o veículo e a data selecionados
    const filteredData = data.filter(record => {
        if (record.date && typeof record.date === 'string') {
            try {
                const recordDate = new Date(record.date).toISOString().split('T')[0];
                return record.nome === vehicleName && recordDate === reportDate;
            } catch (e) {
                console.error('Erro ao converter a data:', e);
                return false;
            }
        }
        return false;
    });

    // Obtenção e tratamento das coordenadas
    const coordinates = filteredData.map(record => ({
        latitude: parseFloat(record.latitude || record.lat),  // Convertendo para float
        longitude: parseFloat(record.longitude || record.lon)
    }));

    // Remoção de coordenadas repetidas ou muito próximas
    const uniqueCoordinates = [];
    let lastCoord = null;
    const threshold = 0.0001;  // Definir o quão próximas as coordenadas podem ser (ajustável)

    coordinates.forEach(coord => {
        if (!lastCoord || Math.abs(coord.latitude - lastCoord.latitude) > threshold || Math.abs(coord.longitude - lastCoord.longitude) > threshold) {
            uniqueCoordinates.push(coord);
            lastCoord = coord;  // Atualiza o último ponto válido
        }
    });

    // Construir a string de coordenadas para o URL
    const coordinatesString = uniqueCoordinates.map(coord => `${coord.longitude},${coord.latitude}`).join('/');

    // Construir o URL do Google Maps com as coordenadas filtradas
    const url = `https://www.google.com/maps/dir/${coordinatesString}`;
    console.log('URL do Google Maps:', url);

    // Abrir o URL em uma nova aba
    window.open(url, '_blank');

} catch (error) {
    console.error('Erro ao buscar dados:', error);
}
}


////////////////////////////////// fim select //////////////////////////////

async function loadSheetData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzYvB9zfP9R400y0iiUnhn9Uqx1q-rbZ1EKLkFG1v_hnl-qj5MqxuInU3vPD8LH2Dsk/exec?action=Read');
        const data = await response.json();

        const vehicleSelect = document.getElementById('vehicleName');
        const dateSelect = document.getElementById('reportDate');

        vehicleSelect.innerHTML = ''; // Limpa as opções existentes
        dateSelect.innerHTML = ''; // Limpa as opções existentes

        const uniqueVehicles = new Set();
        const uniqueDates = new Set();

        data.forEach(record => {
            uniqueVehicles.add(record.nome);
            uniqueDates.add(record.datetime.split(' ')[0]);
        });

        uniqueVehicles.forEach(vehicle => {
            const optionName = document.createElement('option');
            optionName.value = vehicle;
            optionName.text = vehicle;
            vehicleSelect.appendChild(optionName);
        });

        uniqueDates.forEach(date => {
            const optionDate = document.createElement('option');
            optionDate.value = date;
            optionDate.text = date;
            dateSelect.appendChild(optionDate);
        });

    } catch (error) {
        console.error('Erro ao carregar dados da planilha:', error);
    }
}