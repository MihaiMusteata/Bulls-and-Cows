import {db,getDocs,collection} from './Firebase.js';
var UserList = [];
const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
        let user = doc.data();
        UserList.push(user);

    });

console.log(UserList.length);
// Sort list by Total
function SortByTotal() {
UserList.sort((a, b) => (a.usor + a.mediu + a.greu) > (b.usor + b.mediu + b.greu) ? -1 : 1);
}
function SortByEasy() {
UserList.sort((a, b) => (a.usor) > (b.usor) ? -1 : 1);
}
function SortByMedium() {
UserList.sort((a, b) => (a.mediu) > (b.mediu) ? -1 : 1);
}
function SortByHard() {
UserList.sort((a, b) => (a.greu) > (b.greu) ? -1 : 1);
}
function DisplayUsers() {
    // first delete all rows
    const table = document.getElementById('Leaderboard');
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
    for(let i = 0; i < UserList.length; i++) {
    const table = document.getElementById('Leaderboard');
    const newRow = table.insertRow(-1); 
    const Rank = newRow.insertCell(0);
    Rank.classList.add('General-Cell');
    const Jucator = newRow.insertCell(1);
    Jucator.classList.add('Jucator-Cell');
    const Usor = newRow.insertCell(2);
    Usor.classList.add('General-Cell');
    const Mediu = newRow.insertCell(3);
    Mediu.classList.add('General-Cell');
    const Greu = newRow.insertCell(4);
    Greu.classList.add('General-Cell');
    const Total = newRow.insertCell(5);
    Total.classList.add('General-Cell');
    Rank.innerHTML = i+1;
    Jucator.innerHTML = UserList[i].username;
    Usor.innerHTML = UserList[i].usor;
    Mediu.innerHTML = UserList[i].mediu;
    Greu.innerHTML = UserList[i].greu;
    Total.innerHTML = UserList[i].usor + UserList[i].mediu + UserList[i].greu;
}
}

SortByTotal();
DisplayUsers();
document.getElementById('EasyLevel').addEventListener('click', () => {
    document.getElementById('EasyLevel').innerHTML = 'Usor ↑';
    document.getElementById('MediumLevel').innerHTML = 'Mediu';
    document.getElementById('HardLevel').innerHTML = 'Greu';
    document.getElementById('Total').innerHTML = 'Total';
    SortByEasy();
    DisplayUsers();
});
document.getElementById('MediumLevel').addEventListener('click', () => {
    document.getElementById('EasyLevel').innerHTML = 'Usor';
    document.getElementById('MediumLevel').innerHTML = 'Mediu ↑';
    document.getElementById('HardLevel').innerHTML = 'Greu';
    document.getElementById('Total').innerHTML = 'Total';
    SortByMedium();
    DisplayUsers();
});
document.getElementById('HardLevel').addEventListener('click', () => {
    document.getElementById('EasyLevel').innerHTML = 'Usor';
    document.getElementById('MediumLevel').innerHTML = 'Mediu';
    document.getElementById('HardLevel').innerHTML = 'Greu ↑';
    document.getElementById('Total').innerHTML = 'Total';
    SortByHard();
    DisplayUsers();
}
);
document.getElementById('Total').addEventListener('click', () => {
    document.getElementById('EasyLevel').innerHTML = 'Usor';
    document.getElementById('MediumLevel').innerHTML = 'Mediu';
    document.getElementById('HardLevel').innerHTML = 'Greu';
    document.getElementById('Total').innerHTML = 'Total ↑';
    SortByTotal();
    DisplayUsers();
}
);
