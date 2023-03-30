// Initial value tabel
let tableBsc = [];
let tableNwt = [];
let tableSct = [];


// Fungsi f(x)
function f(x){
    return 5 - (5*x) - (Math.E**(0.5*x));
};


// Turunan pertama fungsi f(x)
function derivF(x){
    return (-0.5 * Math.E**(0.5*x)) - 5;
};


// Bisection method
function bisection(xl, xu, es) {
    let iter = 1;
    let condition = true;
    let xr = null;
    let ea = null;

    while (condition) {
        xr = (xl + xu)/2;
        let data = {
            'iteration': iter,
            'xl': xl,
            'f(xl)': f(xl),
            'xu': xu,
            'f(xu)': f(xu),
            'xr': xr,
            'f(xr)': f(xr),
        };

        if (f(xl) * f(xr) < 0) {
            ea = Math.abs(((xr - xu)/xr)*100);
            xu = xr;
        } else if (f(xl) * f(xr) > 0) {
            ea = Math.abs(((xr - xl)/xr)*100);
            xl = xr;
        } else {
            ea = 0;
        }

        condition = ea > es;

        if(iter === 1){
            ea = "";
            condition = true;
        }

        tableBsc.push(data);
        data.ea = ea;
        
        iter = iter + 1;
    }

    document.getElementById('result-bsc').innerHTML = `<p>X = ${xr}</p>`;
}


// Newton Raphson method
function newtonRaphson(x0, es) {
    let iter = 0;
    let condition = true;
    let x1 = null;

    while (condition) {
        let data = {
            'iteration': iter,
            'xi': x0
        }
        
        x1 = x0 - f(x0)/derivF(x0);
        ea = Math.abs(((x1 - x0)/x1)*100);
        condition = ea > es;

        if(iter === 0){
            ea = "";
            condition = true;
        }

        if(condition) {
            x0 = x1;
        }

        data.ea = ea;
        tableNwt.push(data);
        iter = iter + 1;
    }

    document.getElementById('result-nwt').innerHTML = `<p>X = ${x0}</p>`;
}


// Secant method
function secant(x0, x1, es) {
    let iter = 0;
    let condition = true;
    let x2 = null;
    let ea = null;

    while(condition) {
        let data = {
            'iteration': iter,
            'xi': x0
        }

        x2 = x0 - (x1-x0)*f(x0)/( f(x1) - f(x0) )
        ea = Math.abs(((x1 - x0)/x1)*100);

        condition = ea > es;

        if(iter === 0){
            ea = "";
            condition = true;
        }

        if(condition) {
            x0 = x1;
            x1 = x2;
        }

        data.ea = ea;
        tableSct.push(data);
        iter = iter + 1;
    }

    document.getElementById('result-sct').innerHTML = `<p>X = ${x0}</p>`;
}


// Menampilkan tabel untuk perhitungan menggunakan bisection method
function generateTableBsc() {
    // Menghapus perhitungan sebelumnya jika ada
    if (tableBsc.length > 0) {
        tableBsc.length = 0;
        document.getElementById('result-bsc').innerHTML = "";
    }

    // Mengambil nilai initial guess dan error stopping dari input user
    let xl = Number(document.getElementById('xl').value);
    let xu = Number(document.getElementById('xu').value);
    let es = Number(document.getElementById('es').value);

    // Menampilkan nilai f(xl) dan f(xu)
    document.getElementById('fx-value').innerHTML = `<p>f(xl) = ${f(xl)} | f(xu) = ${f(xu)}</p>`;

    // Mengecek apakah tebakan memenuhi syarat, jika memenuhi lakukan perhitungan bisection
    if (f(xl) * f(xu) >= 0.0) {
        document.getElementById('message').innerHTML = 
            "<p>Tebakan yang anda masukkan tidak memenuhi syarat.</p>" +
            "<p>( Nilai f(xl) * f(xu) harus kurang dari 0 )" +
            "<p>Silahkan masukkan tebakan lain.</p>";
        alert("Tebakan yang anda masukkan tidak memenuhi syarat.\nSilahkan masukkan tebakan lain.");
    } else {
        document.getElementById('message').innerHTML = "<p>Tebakan anda memenuhi syarat.</p>";
        bisection(xl, xu, es);
    }

    // Membuat tabel perhitungan
    let k = '<tbody>'
    for(let i = 0;i < tableBsc.length; i++){
        k+= '<tr>';
        k+= '<td>' + tableBsc[i]['iteration'] + '</td>';
        k+= '<td>' + tableBsc[i]['xl'] + '</td>';
        k+= '<td>' + tableBsc[i]['f(xl)'] + '</td>';
        k+= '<td>' + tableBsc[i]['xu'] + '</td>';
        k+= '<td>' + tableBsc[i]['f(xu)'] + '</td>';
        k+= '<td>' + tableBsc[i]['xr'] + '</td>';
        k+= '<td>' + tableBsc[i]['f(xr)'] + '</td>';
        k+= '<td>' + tableBsc[i]['ea'] + '</td>';
        k+= '</tr>';
    }
    k+='</tbody>';
    document.getElementById('tableDataBsc').innerHTML = k;
};


// Menampilkan tabel untuk perhitungan menggunakan newton-raphson method
function generateTableNwt() {
    // Menghapus perhitungan sebelumnya jika ada
    if (tableNwt.length > 0) {
        tableNwt.length = 0;
        document.getElementById('result-nwt').innerHTML = "";
    }

    // Mengambil nilai initial guess dan error stopping dari input user
    let x0 = Number(document.getElementById('xi').value);
    let es = Number(document.getElementById('es2').value);

    // Memanggil method newton-raphson
    newtonRaphson(x0, es);

    // Membuat tabel perhitungan
    let k = '<tbody>'
    for(let i = 0;i < tableNwt.length; i++){
        k+= '<tr>';
        k+= '<td>' + tableNwt[i]['iteration'] + '</td>';
        k+= '<td>' + tableNwt[i]['xi'] + '</td>';
        k+= '<td>' + tableNwt[i]['ea'] + '</td>';
        k+= '</tr>';
    }
    k+='</tbody>';
    document.getElementById('tableDataNwt').innerHTML = k;
};


// Menampilkan tabel untuk perhitungan menggunakan secant method
function generateTableSct() {
    // Menghapus perhitungan sebelumnya jika ada
    if (tableSct.length > 0) {
        tableSct.length = 0;
        document.getElementById('result-sct').innerHTML = "";
    }

    // Menentukan initial guess dan error stopping
    let x0 = Number(document.getElementById('x-1').value);
    let x1 = Number(document.getElementById('xi_').value);
    let es = Number(document.getElementById('es3').value);

    // Memanggil method newton-raphson
    secant(x0, x1, es);

    // Membuat tabel perhitungan
    let k = '<tbody>'
    for(let i = 0;i < tableSct.length; i++){
        k+= '<tr>';
        k+= '<td>' + tableSct[i]['iteration'] + '</td>';
        k+= '<td>' + tableSct[i]['xi'] + '</td>';
        k+= '<td>' + tableSct[i]['ea'] + '</td>';
        k+= '</tr>';
    }
    k+='</tbody>';
    document.getElementById('tableDataSct').innerHTML = k;
};


// Menghapus tabel dan hasil perhitungan
function clearTable(table, result) {
    switch (table) {
        case 1:
            document.getElementById('fx-value').innerHTML = "";
            document.getElementById('message').innerHTML = "";
            document.getElementById('tableDataBsc').innerHTML = "<tbody></tbody>";
            break;
        case 2:
            document.getElementById('tableDataNwt').innerHTML = "<tbody></tbody>";
            break;
        case 3:
            document.getElementById('tableDataSct').innerHTML = "<tbody></tbody>";
            break;
    }

    document.getElementById(result).innerHTML = "";
}