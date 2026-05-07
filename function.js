// DATABASE: Cleaned up and ready for login
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
    }
];

function authenticate() {
    // 1. Kunin ang inputs at gamitan ng .trim() para iwas-error sa spaces
    const userInp = document.getElementById('username').value.trim();
    const uidInp = document.getElementById('uid').value.trim();
    const errorDiv = document.getElementById('error');

    // 2. Debugging Tool (Makikita mo sa F12 > Console kung ano ang mali)
    console.log("Attempting Login...");
    console.log("Typed Name:", userInp);
    console.log("Typed UID:", uidInp);

    // 3. Search Logic
    const soldier = soldiersDatabase.find(s => {
        // Ginagawa nating lowercase pareho para hindi ma-arte sa Big/Small letters
        const isNameMatch = s.name.toLowerCase() === userInp.toLowerCase();
        // String comparison para sa mahabang UID
        const isUidMatch = s.uid === uidInp;
        
        return isNameMatch && isUidMatch;
    });

    // 4. Execution
    if (soldier) {
        console.log("Match Found: " + soldier.name);
        errorDiv.style.display = "none";
        
        // Update Stats (Text)
        document.getElementById('pName').innerText = soldier.name;
        document.getElementById('pUid').innerText = "UID: " + soldier.uid;
        document.getElementById('pRank').innerText = soldier.rank;
        document.getElementById('pKd').innerText = soldier.kd;
        document.getElementById('pLvl').innerText = soldier.lvl;

        // Update Avatar (Image Injection)
        const avatarContainer = document.getElementById('pAvatar');
        if (soldier.img) {
            avatarContainer.innerHTML = `<img src="${soldier.img}" alt="Soldier" style="width:100%; height:100%; object-fit:cover;">`;
        } else {
            avatarContainer.innerHTML = `<div style="font-size:40px; display:flex; justify-content:center; align-items:center; height:100%;">👤</div>`;
        }

        // Switch View with Animation
        document.getElementById('loginCard').classList.add('hidden');
        document.getElementById('profileCard').classList.remove('hidden');
        
    } else {
        // Access Denied
        console.error("No match found in database.");
        errorDiv.style.display = "block";
        
        // Dagdag: Shake effect sa login card pag mali
        const card = document.getElementById('loginCard');
        card.style.animation = 'none';
        void card.offsetWidth; // Trigger reflow
        card.style.animation = 'shake 0.4s ease'; 
    }
}

function logout() {
    // Standard logout
    location.reload();
}