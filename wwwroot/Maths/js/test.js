const startButton = document.getElementById('start');
const urlInput = document.getElementById('urlInput');
const testResults = document.getElementById('testResults');
const verdictMessage = document.getElementById('verdictMessage');

// Operations to test
const operations = [
    ['?op=+&x=25&y=25', 50],
    ['?op=-&x=1&y=abc', "y need to be a number"],
    ['?op=p&n=a', "n need to be a number"],
    ['?op=-&x=111&y=244', -133],
    ['?op=*&x=11.56&y=244.12345', 2822.067082],
    ['?op=/&x=99&y=11.06', 8.95117540687161],
    ['?op=/&x=99&y=0', "Nan"],
    ['?op=/&x=0&y=0', "Infinity"],
    ['?op=%&x=5&y=5', 0],
    ['?op=%&x=100&y=13', 9],
    ['?op=%&x=100&y=0', null],
    ['?op=!&n=0', "n need to be a integrer > 0"],
    ['?op=p&n=0', false],
    ['?op=p&n=1', false],
    ['?op=p&n=2', true],
    ['?op=p&n=5', true],
    ['?op=p&n=6', false],
    ['?op=p&n=6.5', true],
    ['?op=p&n=113', true],
    ['?op=p&n=114', false],
    ['?op=np&n=1', 2],
    ['?op=!&x=111&y=244&z=22', "To many parameter"],
    ['?op=!&n=5&z=244', "To many parameter"],
    ['?op=!&n=5.5&z=244', "To many parameter"],
    ['?op=&z=1', "op need to be define"],
    ['?op=!&n=-5', "n need to be a integrer > 0"],
    ['?op=&x=0', "op need to be define"],
    ['?op=+&X=111&y=244', "x is missing"],
    ['?op=+&x=111&Y=244', "y is missing"],
];

// Start button click event
startButton.addEventListener('click', () => {
    const baseUrl = urlInput.value.trim();

  
    testResults.innerHTML = '';
    verdictMessage.textContent = '';

    let successfulRequests = 0;
    const totalRequests = operations.length;

    
    operations.forEach(([operation, expectedResult]) => {
        let url = `${baseUrl}/api/maths${operation}`;

        
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                
                let resultToCheck = data.error ? data.error : data.value !== undefined ? data.value : data;

               
                let isSuccess = JSON.stringify(resultToCheck) === JSON.stringify(expectedResult);

               
                testResults.innerHTML += `<div>${isSuccess ? "OK" : "Fail"} ---> Expected: ${JSON.stringify(expectedResult)}, Got: ${JSON.stringify(resultToCheck)}</div>`;

                if (isSuccess) {
                    successfulRequests++;
                }

                
                if (successfulRequests === totalRequests) {
                    verdictMessage.textContent = 'All tests passed successfully!';
                }
            })
            .catch((error) => {
                
                testResults.innerHTML += `<p style="color: red;">Error: ${error.message}</p>`;
            });
    });
});
