const state = {
  coins: Number(localStorage.getItem("dragon_demo_coins") || 0),
  selectedCoins: 1
};

const coinBalance = document.getElementById("coinBalance");
const modalBalance = document.getElementById("modalBalance");
const topupModal = document.getElementById("topupModal");
const topupTotal = document.getElementById("topupTotal");
const toast = document.getElementById("toast");


// ========================================
// FORMAT RUPIAH
// ========================================

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}


// ========================================
// UPDATE SALDO
// ========================================

function renderBalance() {
  coinBalance.textContent = state.coins;
  modalBalance.textContent = state.coins;
}


// ========================================
// MODAL TOP UP
// ========================================

function openModal() {
  topupModal.classList.add("open");
  renderBalance();
}

function closeModal() {
  topupModal.classList.remove("open");
}


// ========================================
// TOAST NOTIFICATION
// ========================================

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}


// ========================================
// BUKA TOP UP
// ========================================

document
  .getElementById("openTopup")
  .addEventListener("click", openModal);

document
  .getElementById("heroTopup")
  .addEventListener("click", openModal);


// ========================================
// TUTUP TOP UP
// ========================================

document
  .getElementById("closeTopup")
  .addEventListener("click", closeModal);


// Klik area luar modal untuk menutup
topupModal.addEventListener("click", (event) => {

  if (event.target === topupModal) {
    closeModal();
  }

});


// ========================================
// PILIH PAKET KOIN
// ========================================

document
  .querySelectorAll(".package")
  .forEach((button) => {

    button.addEventListener("click", () => {

      // Hapus pilihan sebelumnya
      document
        .querySelectorAll(".package")
        .forEach((item) => {
          item.classList.remove("active");
        });


      // Aktifkan pilihan baru
      button.classList.add("active");


      // Ambil jumlah koin
      state.selectedCoins =
        Number(button.dataset.coins);


      // Hitung harga
      const total =
        state.selectedCoins * 1000;


      // Tampilkan harga
      topupTotal.textContent =
        formatRupiah(total);

    });

  });


// ========================================
// CHECKOUT
// ========================================

document
  .getElementById("checkoutBtn")
  .addEventListener("click", () => {

    const coins =
      state.selectedCoins;

    const price =
      coins * 1000;


    // Sementara hanya demo
    showToast(
      `Demo checkout: ${coins} koin • ${formatRupiah(price)}`
    );

  });


// ========================================
// PRODUK PREMIUM
// ========================================

document
  .querySelectorAll(".buy-btn:not(.disabled)")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const product =
        button.dataset.product;

      const price =
        Number(button.dataset.price);


      // Cek saldo
      if (state.coins < price) {

        openModal();

        showToast(
          `Koin tidak cukup untuk ${product}.`
        );

        return;
      }


      // Sementara belum ada login/backend
      showToast(
        `${product} akan tersedia setelah sistem login tersambung.`
      );

    });

  });


// ========================================
// INITIALIZE
// ========================================

renderBalance();