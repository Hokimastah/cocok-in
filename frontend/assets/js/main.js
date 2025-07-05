// Definisikan URL dasar untuk API. Untuk Vercel, cukup gunakan path relatif.
const API_URL = '/api';

/**
 * Menampilkan pesan di elemen UI yang ditentukan.
 * @param {string} elementId - ID dari elemen HTML untuk menampilkan pesan.
 * @param {string} message - Pesan yang akan ditampilkan.
 * @param {boolean} [isError=false] - Jika true, pesan akan ditampilkan sebagai error (merah).
 */
const showMessage = (elementId, message, isError = false) => {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = isError ? 'text-red-500 text-sm mt-2 text-center' : 'text-green-500 text-sm mt-2 text-center';
        messageElement.style.display = 'block';
    }
};

// --- LOGIKA UNTUK HALAMAN REGISTRASI ---
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const messageElementId = 'register-message';
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!fullName || !email || !password) {
            showMessage(messageElementId, 'Harap isi semua field yang wajib diisi.', true);
            return;
        }
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password }),
            });
            const data = await res.json();
            if (!res.ok) { throw new Error(data.message || 'Gagal mendaftar'); }
            
            showMessage(messageElementId, 'Registrasi berhasil! Anda akan diarahkan...');
            localStorage.setItem('cocokin_token', data.token);
            setTimeout(() => { window.location.href = 'index.html'; }, 2000);
        } catch (error) {
            showMessage(messageElementId, error.message, true);
        }
    });
}

// --- LOGIKA UNTUK HALAMAN LOGIN ---
const signinForm = document.getElementById('signin-form');
if (signinForm) {
    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const messageElementId = 'signin-message';
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            showMessage(messageElementId, 'Email dan password tidak boleh kosong.', true);
            return;
        }
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) { throw new Error(data.message || 'Gagal login'); }
            
            showMessage(messageElementId, 'Login berhasil! Mengarahkan ke halaman utama...');
            localStorage.setItem('cocokin_token', data.token);
            setTimeout(() => { window.location.href = 'index.html'; }, 1500);
        } catch (error) {
            showMessage(messageElementId, error.message, true);
        }
    });
}

// --- LOGIKA UNTUK SEMUA HALAMAN SETELAH LOGIN ---
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('cocokin_token');
    
    if (document.body.dataset.protected === 'true' && !token) {
        window.location.href = 'login.html';
        return;
    }

    // --- Logika Halaman Utama ---
    if (document.getElementById('home-page-container')) {
        try {
            const profileRes = await fetch(`${API_URL}/users/profile`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (!profileRes.ok) {
                localStorage.removeItem('cocokin_token');
                window.location.href = 'login.html';
                return;
            }
            const user = await profileRes.json();
            document.getElementById('user-initial').textContent = user.fullName.charAt(0).toUpperCase();
            document.getElementById('welcome-message').textContent = `Selamat datang, ${user.nickName || user.fullName}!`;

            const recommendationsRes = await fetch(`${API_URL}/recommendations`, { headers: { 'Authorization': `Bearer ${token}` } });
            const recommendationsContainer = document.getElementById('recommendations-container');
            recommendationsContainer.innerHTML = '';
            if (recommendationsRes.ok) {
                const recommendations = await recommendationsRes.json();
                if (recommendations.length > 0) {
                    recommendations.slice(0, 2).forEach(major => {
                        const majorCard = `<div class="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4"><div class="w-16 h-16 rounded-full border-4 border-purple-500 flex items-center justify-center font-bold text-purple-500 text-lg bg-purple-50">${major.primaryRiasecType}</div><div class="flex-grow"><h4 class="font-bold text-gray-800">${major.name}</h4><p class="text-sm text-gray-500">${major.description}</p></div></div>`;
                        recommendationsContainer.innerHTML += majorCard;
                    });
                } else {
                     recommendationsContainer.innerHTML = '<p class="text-center text-gray-500">Belum ada rekomendasi.</p>';
                }
            } else {
                const errorData = await recommendationsRes.json();
                recommendationsContainer.innerHTML = `<p class="text-center text-gray-500">${errorData.message}</p>`;
            }
        } catch (error) { console.error('Error:', error); }
    }

    // --- Logika Halaman Tes ---
    if (document.getElementById('test-page-container')) {
        const questionsContainer = document.getElementById('questions-container');
        const testForm = document.getElementById('test-form');
        try {
            const res = await fetch(`${API_URL}/tests/questions`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (!res.ok) throw new Error('Gagal memuat pertanyaan.');
            const questions = await res.json();
            questionsContainer.innerHTML = '';
            questions.forEach(q => {
                const questionElement = `<div class="mb-6 p-4 border rounded-lg"><p class="font-semibold text-gray-700 mb-3">${q.text}</p><div class="flex gap-4"><label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="${q.id}" value="ya" class="form-radio h-5 w-5 text-purple-600" required> Ya</label><label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="${q.id}" value="tidak" class="form-radio h-5 w-5 text-gray-400"> Tidak</label></div></div>`;
                questionsContainer.innerHTML += questionElement;
            });
            testForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(testForm);
                const answers = [];
                for (let [questionId, answer] of formData.entries()) {
                    answers.push({ questionId, answer });
                }
                const submitRes = await fetch(`${API_URL}/tests/submit`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ answers })
                });
                if (!submitRes.ok) throw new Error('Gagal mengirim jawaban.');
                showMessage('test-message', 'Tes selesai! Anda akan diarahkan kembali.');
                setTimeout(() => { window.location.href = 'index.html'; }, 2000);
            });
        } catch (error) { showMessage('test-message', error.message, true); }
    }

    // --- Logika Halaman Rekomendasi ---
    if (document.getElementById('recommendation-page-container')) {
        const recommendationsList = document.getElementById('recommendations-list');
        recommendationsList.innerHTML = '<p class="text-center text-gray-500">Memuat rekomendasi...</p>';
        try {
            const res = await fetch(`${API_URL}/recommendations`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const recommendations = await res.json();
            if (!res.ok) { throw new Error(recommendations.message); }

            recommendationsList.innerHTML = '';
            if (recommendations.length > 0) {
                recommendations.forEach(major => {
                    const majorCard = `<div class="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 border"><div class="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center font-bold text-blue-500 text-lg bg-blue-50">${major.primaryRiasecType}</div><div class="flex-grow"><h4 class="font-bold text-gray-800">${major.name}</h4><p class="text-sm text-gray-500">${major.description}</p></div></div>`;
                    recommendationsList.innerHTML += majorCard;
                });
            } else {
                recommendationsList.innerHTML = '<p class="text-center text-gray-500">Belum ada rekomendasi untuk Anda.</p>';
            }
        } catch (error) {
            recommendationsList.innerHTML = `<p class="text-center text-red-500">${error.message}</p>`;
        }
    }

    // --- Logika Halaman Prospek Karir ---
    if (document.getElementById('career-page-container')) {
        const trendingCareersContainer = document.getElementById('trending-careers-container');
        trendingCareersContainer.innerHTML = '<p class="text-center text-gray-500">Memuat karir...</p>';
        try {
            const res = await fetch(`${API_URL}/careers`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const careers = await res.json();
            if (!res.ok) { throw new Error(careers.message || 'Gagal memuat data karir.'); }

            trendingCareersContainer.innerHTML = '';
            if (careers.length > 0) {
                careers.forEach(career => {
                    const careerCard = `<div class="bg-white p-4 rounded-xl shadow-sm border"><h4 class="font-bold text-gray-800">${career.name}</h4><div class="flex justify-between items-center mt-2"><span class="font-semibold text-green-600">${career.salary}</span><button class="bg-blue-100 text-blue-600 font-semibold py-1 px-4 rounded-full text-sm">Lihat Detail</button></div></div>`;
                    trendingCareersContainer.innerHTML += careerCard;
                });
            } else {
                trendingCareersContainer.innerHTML = '<p class="text-center text-gray-500">Belum ada data karir yang tersedia.</p>';
            }
        } catch (error) {
            trendingCareersContainer.innerHTML = `<p class="text-center text-red-500">${error.message}</p>`;
        }
    }

    // --- Logika Halaman Konsultasi Online ---
    if (document.getElementById('consultation-page-container')) {
        const consultantsList = document.getElementById('consultants-list');
        consultantsList.innerHTML = '<p class="text-center text-gray-500">Memuat daftar konsultan...</p>';
        try {
            const res = await fetch(`${API_URL}/consultations`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const consultants = await res.json();
            if (!res.ok) {
                throw new Error(consultants.message || 'Gagal memuat data konsultan.');
            }
            consultantsList.innerHTML = '';
            if (consultants.length > 0) {
                consultants.forEach(consultant => {
                    const consultantCard = `<div class="bg-white p-4 rounded-xl shadow-sm flex gap-4 border"><img src="${consultant.profilePictureUrl.replace('64x64', `64x64/D6BCFA/4A3780?text=${consultant.name.charAt(0)}`)}" class="w-16 h-16 rounded-full" alt="Foto ${consultant.name}"><div class="flex-grow"><h4 class="font-bold">${consultant.name}</h4><p class="text-sm text-gray-500">${consultant.university}</p><div class="flex items-center gap-1 text-sm text-yellow-500 mt-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m12 17.27 5.18 3.73-1.64-5.81L21 9.27l-6.09-.5L12 3 9.09 8.77 3 9.27l5.46 4.92-1.64 5.81z"/></svg><span class="font-bold text-gray-700">${consultant.rating}</span><span class="text-gray-400">(${consultant.reviewCount})</span></div></div></div>`;
                    consultantsList.innerHTML += consultantCard;
                });
            } else {
                consultantsList.innerHTML = '<p class="text-center text-gray-500">Belum ada konsultan yang tersedia.</p>';
            }
        } catch (error) {
            consultantsList.innerHTML = `<p class="text-center text-red-500">${error.message}</p>`;
        }
    }
});
