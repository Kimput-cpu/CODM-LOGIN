
const soldiersDatabase = [
    { 
        name: "WYKRT・MeruVB", 
        uid: "7449107171716890625", 
        rank: "LEGENDARY", 
        kd: "30.00", 
        lvl: "400",
        img: "daryl.jpg" 
    },
    { 
        name: "WYKRT・BaldoVB", 
        uid: "7044740175758360577", 
        rank: "GRANDMASTER", 
        kd: "30.85", 
        lvl: "400",
        img: "angelo.png"
    },
    { 
        name: "WYKRT・KutobVB", 
        uid: "6932836846057553921", 
        rank: "LEGENDARY", 
        kd: "34.50", 
        lvl: "400",
        img: "jess.png"
    },
    { 
        name: "WYKRT・VanïVB", 
        uid: "6848109271469522945", 
        rank: "GRANDMASTER", 
        kd: "20.85", 
        lvl: "400",
        img: "ivan.png"
    }
];

function authenticate() {
    
    const userInp = document.getElementById('username').value.trim();
    const uidInp = document.getElementById('uid').value.trim();
    const keyInp = document.getElementById('accessKey').value.trim();
    const errorDiv = document.getElementById('error');

   
    const MASTER_KEY = "WYKRT2026"; 

    console.log("Authentication initiated...");

    if (keyInp !== MASTER_KEY) {
        errorDiv.innerText = "ACCESS DENIED: INVALID SECRET KEY";
        errorDiv.style.display = "block";
        console.warn("Security Alert: Wrong Access Key used.");
        return; // Stop execution
    }

    const soldier = soldiersDatabase.find(s => {
        const isNameMatch = s.name.toLowerCase() === userInp.toLowerCase();
        const isUidMatch = s.uid === uidInp;
        return isNameMatch && isUidMatch;
    });

    if (soldier) {
        console.log("Access Granted: Welcome, " + soldier.name);
        errorDiv.style.display = "none";
        
        document.getElementById('pName').innerText = soldier.name.toUpperCase();
        document.getElementById('pUid').innerText = "UID: " + soldier.uid;
        document.getElementById('pRank').innerText = soldier.rank;
        document.getElementById('pKd').innerText = soldier.kd;
        document.getElementById('pLvl').innerText = soldier.lvl;

        const avatarContainer = document.getElementById('pAvatar');
        if (soldier.img) {
            avatarContainer.innerHTML = `<img src="${soldier.img}" alt="Profile" style="width:100%; height:100%; object-fit:cover; border-radius: 5px;">`;
        } else {
            avatarContainer.innerHTML = `<div style="font-size:50px; display:flex; justify-content:center; align-items:center; height:100%;">👤</div>`;
        }

        document.getElementById('loginCard').classList.add('hidden');
        document.getElementById('profileCard').classList.remove('hidden');
        
    } else {
        errorDiv.innerText = "ACCESS DENIED: INVALID IGN OR UID";
        errorDiv.style.display = "block";
        
        const card = document.getElementById('loginCard');
        card.style.animation = 'none';
        void card.offsetWidth; 
        card.style.animation = 'shake 0.4s ease'; 
    }
}

function logout() {
    location.reload();
}
