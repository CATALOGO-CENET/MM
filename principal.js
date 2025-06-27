async function generarDiploma() {
  const { jsPDF } = window.jspdf;

  const nombre = document.getElementById("nombre").value;
  const curso = document.getElementById("curso").value;
  const fecha = document.getElementById("fecha").value;

  if (!nombre || !curso || !fecha) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Crear el documento PDF
  const pdf = new jsPDF("landscape");
  const img = new Image();
  img.src = "./activos/diplo.png";

  img.onload = async function () {
    pdf.addImage(img, "PNG", 0, 0, 297, 210);
    pdf.setFontSize(20);
    pdf.text(nombre, 148, 110, { align: "center" });
    pdf.text(curso, 148, 130, { align: "center" });
    pdf.text(fecha, 148, 150, { align: "center" });

    // Generar código QR
    const qrData = `https://tu-sistema.com/verificar-diploma?nombre=${encodeURIComponent(nombre)}&curso=${encodeURIComponent(curso)}&fecha=${encodeURIComponent(fecha)}`;
    const qrCanvas = document.getElementById("qrCanvas");
    await QRCode.toCanvas(qrCanvas, qrData);
    
    // Mostrar QR en pantalla para pruebas
    document.getElementById("previewQR").appendChild(qrCanvas);

    // Añadir QR al PDF
    const qrImage = qrCanvas.toDataURL("image/png");
    pdf.addImage(qrImage, "PNG", 250, 140, 40, 40);

    // Descargar PDF
    pdf.save(`${nombre}_Diploma.pdf`);
  };
}

