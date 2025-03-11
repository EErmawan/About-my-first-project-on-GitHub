Script.js
document.addEventListener("DOMContentLoaded", () => {
    const formAbsensi = document.getElementById("form-absensi");
    const listAbsensi = document.getElementById("list-absensi");

    // Menampilkan data saat halaman dimuat
    tampilkanAbsensi();

    formAbsensi.addEventListener("submit", (e) => {
        e.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const kelas = document.getElementById("kelas").value;
        const status = document.getElementById("status").value;

        if (nama === "" || kelas === "" || status === "") {
            alert("Harap isi semua kolom sebelum menyimpan!");
            return;
        }

        const absensi = { nama, kelas, status };

        // Simpan data ke localStorage
        let absensiArray = JSON.parse(localStorage.getItem("absensi")) || [];
        absensiArray.push(absensi);
        localStorage.setItem("absensi", JSON.stringify(absensiArray));

        // Reset form setelah submit
        formAbsensi.reset();

        // Perbarui tampilan
        tampilkanAbsensi();
    });

    function tampilkanAbsensi() {
        const absensiStorage = JSON.parse(localStorage.getItem("absensi")) || [];

        if (absensiStorage.length === 0) {
            listAbsensi.innerHTML = "<p>Tidak ada data absensi</p>";
            return;
        }

        listAbsensi.innerHTML = absensiStorage
            .map(
                (absensi, index) => `
                <div class="absensi-item">
                    <h3>${absensi.nama}</h3>
                    <p><strong>Kelas:</strong> ${absensi.kelas}</p>
                    <p><strong>Status:</strong> ${absensi.status}</p>
                    <button class="hapus-btn" onclick="hapusAbsensi(${index})">Hapus</button>
                </div>
            `
            )
            .join("");
