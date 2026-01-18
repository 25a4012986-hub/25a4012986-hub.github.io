// ==========================
// HÀM TÍNH ĐIỂM CHÍNH
// ==========================
window.calculateResult = function () {
  let total = 0;
  let notes = [];

 /* ================= I. Ý thức học tập & NCKH (MAX 20) ================= */
let section1 = 0;

/* ===== I.1 GPA (MAX 15) ===== */
const gpaPoints = [15, 14, 10, 7, 5];
document.querySelectorAll('input[name="gpa"]').forEach((el, i) => {
  if (el.checked) section1 += gpaPoints[i];
});

/* ===== I.2 Hoạt động khoa học (MAX 5) ===== */
let science = 0;

/* NCKH / cuộc thi học thuật */
if (document.querySelector('.science-checkbox:checked')) {
  science += 5;
}

/* Sinh hoạt khoa học */
const seminarScores = [1, 2, 3];
document.querySelectorAll('input[name="seminar"]').forEach((el, i) => {
  if (el.checked) science += seminarScores[i];
});

/* Tutor / trợ giảng */
if (document.querySelector('.tutor-checkbox')?.checked) {
  science += 3;
}

/* ÉP TRẦN MỤC 1.2 */
science = Math.min(science, 5);

/* CỘNG VÀO MỤC I + ÉP TRẦN MỤC I */
section1 += science;
section1 = Math.min(section1, 20);

/* CỘNG VÀO TỔNG */
total += section1;

  /* ===== II. Quy chế ===== */
  const rulePoints = [25, 20, 10, 0];
  document.querySelectorAll('input[name="rule"]').forEach((el, i) => {
    if (el.checked) total += rulePoints[i];
  });

  /* ===== III. Hoạt động HVNH ===== */
  const activityPoints = [10, 15, 20];
  document.querySelectorAll('input[name="activity"]').forEach((el, i) => {
    if (el.checked) total += activityPoints[i];
  });

  /* ===== IV. Công dân ===== */
  if (document.querySelector('input[name="citizen"]')?.checked) total += 20;
  if (document.querySelector('input[name="community"]')?.checked) total += 5;

  /* ===== V. Cán bộ – Đoàn – Hội (CHECKBOX + TRẦN 10) ===== */
let sectionV = 0;

document.querySelectorAll('.role-v:checked').forEach(el => {
  sectionV += Number(el.dataset.point || 0);
});

if (sectionV > 10) {
  sectionV = 10;
  notes.push("Phần V (Cán bộ – Đoàn – Hội) được tính tối đa 10 điểm dù có kiêm nhiệm nhiều vị trí.");
}

total += sectionV;

 /* ===== VI. ĐIỂM CỘNG (MAX 10) ===== */
let bonus = 0;

/* 1️⃣ Giải thưởng NCKH – lấy mức CAO NHẤT */
let bonusAward = 0;
const awardPoints = [10, 8, 6, 5, 4, 4, 3, 2, 1];

document.querySelectorAll('input[name="award_nckh"]').forEach((el, i) => {
  if (el.checked) {
    bonusAward = Math.max(bonusAward, awardPoints[i]);
  }
});

/* 2️⃣ Giấy khen – lấy mức CAO NHẤT */
let bonusCert = 0;
const certPoints = [10, 8, 4, 2];

document.querySelectorAll('input[name="certificate"]').forEach((el, i) => {
  if (el.checked) {
    bonusCert = Math.max(bonusCert, certPoints[i]);
  }
});

/* 3️⃣ Trường hợp đặc biệt – cộng dồn */
let bonusSpecial = 0;

if (document.getElementById("sv_khuyet_tat")?.checked) {
  bonusSpecial += 2;
}

if (document.getElementById("vuon_len_hoc_tap")?.checked) {
  bonusSpecial += 2;
}

/* 4️⃣ Tổng điểm cộng + ÉP TRẦN */
bonus = bonusAward + bonusCert + bonusSpecial;
bonus = Math.min(bonus, 10);

/* Cộng vào tổng */
total += bonus;

  /* ===== VII. ĐIỂM TRỪ ===== */
  let penalty = 0;
  document.querySelectorAll('[data-penalty]').forEach(el => {
    if (!el.checked) return;
    const map = { vo_le: 5, hv1: 2, hv2: 3, hv3: 4, debt: 4 };
    penalty += map[el.dataset.penalty] || 0;
  });
  total -= penalty;

  /* ===== TRỪ ĐẶC BIỆT ===== */
  if (document.querySelector('[data-penalty="khien_trach"]')?.checked && total > 80) {
    total = 80;
    notes.push("⚠️ Bị kỷ luật khiển trách → điểm tối đa bị khống chế ở mức 80.");
  }

  if (
    document.querySelector('[data-penalty="canh_cao"]')?.checked ||
    document.querySelector('[data-penalty="dinh_chi"]')?.checked
  ) {
    if (total > 65) {
      total = 65;
      notes.push("⚠️ Bị cảnh cáo / đình chỉ → điểm tối đa bị khống chế ở mức 65.");
    }
  }

  /* ===== GIỚI HẠN ===== */
  total = Math.max(0, Math.min(100, total));

  /* ===== XẾP LOẠI ===== */
  const rank =
    total >= 90 ? "Xuất sắc" :
    total >= 80 ? "Tốt" :
    total >= 65 ? "Khá" :
    total >= 50 ? "Trung bình" : "Yếu";

  /* ===== GHI CHÚ THEO XẾP LOẠI ===== */
  let rankNote = "";

  if (rank === "Xuất sắc") {
    rankNote = `
      <ul>
        <li>Đủ điều kiện xét <b>Học bổng Khuyến khích học tập loại Xuất sắc</b> (nếu GPA phù hợp).</li>
        <li>Có thể được Học viện xem xét biểu dương, khen thưởng đặc biệt</li>
        <li>Được ưu tiên trong xét các hỗ trợ, dịch vụ và cơ hội học thuật.</li>
      </ul>
    `;
  } else if (rank === "Tốt") {
    rankNote = `
      <ul>
        <li>Đủ điều kiện xét <b>Học bổng Khuyến khích học tập loại Khá, Giỏi</b> (tùy GPA)</li>
        <li>Là tiêu chí ưu tiên khi xét khen thưởng nếu GPA bằng nhau.</li>
<li>Đủ điều kiện tham gia hầu hết các chương trình học bổng, tài trợ.</li>
      </ul>
    `;
  } else if (rank === "Khá") {
    rankNote = `
      <ul>
        <li>Đủ điều kiện xét <b>Học bổng Khuyến khích học tập loại Khá</b>.</li>
        <li>Đáp ứng yêu cầu xét tốt nghiệp và các quyền lợi học vụ cơ bản.</li>
      </ul>
    `;
  } else if (rank === "Trung bình") {
    rankNote = `
      <ul>
        <li>Kết quả rèn luyện vẫn được ghi nhận và là căn cứ xét tốt nghiệp.</li>
        <li>Chưa đủ điều kiện xét học bổng và khen thưởng. Nên cải thiện điểm rèn luyện ở các học kỳ tiếp theo để mở rộng cơ hội.</li>
      </ul>
    `;
  } else {
    rankNote = `
      <ul>
        <li>Nếu xếp loại <b>Yếu</b> trong 2 học kỳ liên tiếp có thể bị tạm ngừng học.</li>
        <li>Nên chủ động cải thiện kết quả rèn luyện ở học kỳ tiếp theo.</li>
      </ul>
    `;
  }

  /* ===== HIỂN THỊ ===== */
  document.getElementById("totalScore").innerText = total;
  document.getElementById("rank").innerText = rank;
  document.getElementById("resultBox").style.display = "block";

  const noteBox = document.getElementById("noteBox");
  const noteContent = document.getElementById("noteContent");

  let finalNoteHTML = `<p><b>Điểm rèn luyện của bạn:</b></p>${rankNote}`;

  if (notes.length > 0) {
    finalNoteHTML += `<hr><p><b>Lưu ý bổ sung:</b></p>` + notes.map(n => `<p>${n}</p>`).join("");
  }

  noteContent.innerHTML = finalNoteHTML;
  noteBox.style.display = "block";
};

// ==========================
// NÚT FEEDBACK
// ==========================
window.openFeedback = function () {
  window.open("https://forms.gle/tKBiR1BQxvhhBku58", "_blank");
};
