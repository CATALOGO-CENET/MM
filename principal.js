async function generarDiploma() {
  const { jsPDF } = window.jspdf;

  const nombre = document.getElementById("nombre").value;
  const curso = document.getElementById("curso").value;
  const fecha = document.getElementById("fecha").value;
  const estilo = document.getElementById("estilo").value;

  if (!nombre || !curso || !fecha || !estilo) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const pdf = new jsPDF("landscape");
  const img = new Image();

  if (estilo === "1") {
    img.src = "./activos/diplo.png";
  } else if (estilo === "2") {
    img.src = "./activos/diplo2.png";
  } else if (estilo === "3") {
    img.src = "./activos/diplo3.png";
  }

  img.onload = async function () {
    pdf.addImage(img, "PNG", 0, 0, 297, 210);

    pdf.setFontSize(20);
    if (estilo === "1") {
      pdf.text(nombre, 50, 90);
      pdf.text(curso, 150, 130);
      pdf.text(fecha, 200, 180);
    } else if (estilo === "2") {
      pdf.text(nombre, 55, 105);
      pdf.text(curso, 140, 140);
      pdf.text(fecha, 220, 160);
    } else if (estilo === "3") {
      pdf.text(nombre, 70, 80);
      pdf.text(curso, 130, 120);
      pdf.text(fecha, 190, 170);
    }

    const qrData = `Diploma de Finalización\nNombre: ${nombre}\nCurso: ${curso}\nFecha: ${fecha}`;
    const qrCanvas = document.getElementById("qrCanvas");
    await QRCode.toCanvas(qrCanvas, qrData);
    const qrImage = qrCanvas.toDataURL("image/png");
    pdf.addImage(qrImage, "PNG", 260, 180, 20, 20);

    // Descargar PDF
    pdf.save(`${nombre}_Diploma.pdf`);
  };
}

