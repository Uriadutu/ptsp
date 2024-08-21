import React, { useState, useEffect, useRef } from "react";
import AddPegawaiModal from "../Modal/LapasiModal/AddPegawai";
import EditPegawaiModal from "../Modal/LapasiModal/EditPegawaiModal";
import axios from "axios";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { IoEyeSharp, IoAdd, IoDocument } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import PegawaiPDF from "../../Export/LapasiExport/PegawaiPDF";
import { useReactToPrint } from "react-to-print";

const DataPegawai = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModaEdit] = useState(false);
  const [pegawai, setPegawai] = useState([]);
  const [filteredPegawai, setFilteredPegawai] = useState([]);
  const [selectedPegawai, setSelectedPegawai] = useState({});
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pegawaiPerPage, setPegawaiPerPage] = useState(10);

  const navigate = useNavigate();
  const ComponentToPDF = useRef();

  const hitungMasaKerja = (tmt_pengangkatan) => {
    if (!tmt_pengangkatan) return "";

    const today = new Date();
    const tmtDate = new Date(tmt_pengangkatan);

    let years = today.getFullYear() - tmtDate.getFullYear();
    let months = today.getMonth() - tmtDate.getMonth();
    let days = today.getDate() - tmtDate.getDate();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (days < 0) {
      months--;
      let prevMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
      let prevMonthDays = new Date(
        today.getFullYear(),
        prevMonth + 1,
        0
      ).getDate();
      days += prevMonthDays;
    }

    let weeks = Math.floor(days / 7);
    days = days % 7;

    let masaKerjaArray = [];
    if (years > 0) masaKerjaArray.push(`${years} tahun`);
    if (months > 0) masaKerjaArray.push(`${months} bulan`);
    if (weeks > 0) masaKerjaArray.push(`${weeks} minggu`);
    if (days > 0) masaKerjaArray.push(`${days} hari`);

    return masaKerjaArray.join(" ");
  };

  const getPegawai = async () => {
    try {
      const response = await axios.get("http://192.168.85.20:3005/pegawai");
      setPegawai(response.data);
      hitungMasaKerja(response.data.tmt_pengangkatan);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusPegawai = async (id) => {
    try {
      await axios.delete(`http://192.168.85.20:3005/pegawai/${id}`);
      getPegawai();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModalEdit = (pegawai) => {
    setSelectedPegawai(pegawai);
    setOpenModaEdit(true);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const printPDF = useReactToPrint({
    content: () => ComponentToPDF.current,
    documentTitle: `DataJabatan.pdf`,
  });

  const downloadExcel = () => {
    const dataToExport = pegawai.map((item, index) => ({
      No: index + 1,
      NIP: item.NIP,
      "Jenis Pegawai": item.jenis_pegawai,
      "Nama Pegawai": item.nama_pegawai,
      "Pangkat/Golongan": item.pangkat_gol,
      Jabatan: item.jabatan,
      "TMT Terakhir": item.tmt_terakhir,
      "TMT Pengangkatan": item.tmt_pengangkatan,
      "Masa Kerja": hitungMasaKerja(item.tmt_pengangkatan),
      "TMT Pensiun": item.tmt_pensiun,
      "Pendidikan Terakhir": item.pend_terakhir,
      Jurusan: item.jurusan,
      "Tahun Lulus": item.tahun_lulus,
      "Jenis Kelamin": item.jenis_kelamin,
      "Tempat Lahir": item.temp_lahir,
      "Tanggal Lahir": item.tgl_lahir,
      Agama: item.agama,
      "Satuan Kerja": item.satuan_kerja,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataPegawai");
    XLSX.writeFile(workbook, "DataPegawai.xlsx");
  };

  const filterAndPaginatePegawai = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = pegawai.filter(
      (pegawai) =>
        pegawai.nama_pegawai.toLowerCase().includes(lowerCaseSearchText) ||
        pegawai.NIP.toLowerCase().includes(lowerCaseSearchText)
    );

    const indexOfLastPegawai = currentPage * pegawaiPerPage;
    const indexOfFirstPegawai = indexOfLastPegawai - pegawaiPerPage;
    const currentPegawai = filtered.slice(
      indexOfFirstPegawai,
      indexOfLastPegawai
    );

    setFilteredPegawai(currentPegawai);
  };

  useEffect(() => {
    getPegawai();
  }, []);

  useEffect(() => {
    filterAndPaginatePegawai();
  }, [pegawai, searchText, currentPage]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pegawai.length / pegawaiPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalPNS = pegawai.filter(
    (item) => item.jenis_pegawai === "PNS"
  ).length;

  return (
    <div className="contain">
      {openModalAdd && (
        <AddPegawaiModal
          setIsOpenModalAdd={setOpenModalAdd}
          getPegawai={getPegawai}
        />
      )}
      {openModalEdit && (
        <EditPegawaiModal
          setIsOpenModalEdit={setOpenModaEdit}
          getPegawai={getPegawai}
          selectedPegawai={selectedPegawai}
        />
      )}
      <div style={{ display: "none" }}>
        <PegawaiPDF
          ref={ComponentToPDF}
          pegawai={pegawai}
          fungsiCalculate={hitungMasaKerja}
        />
      </div>
      <h1 className="judul">Data Pegawai</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Pegawau
          </button>
          <button
            onClick={downloadExcel}
            className="btn-download hidden sm:block"
          >
            Export ke Excel
          </button>
          <button onClick={printPDF} className="btn-pdf hidden sm:block">
            Print PDF
          </button>
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add sm:hidden block"
          >
            <IoAdd color="white" />
          </button>
          <button
            onClick={downloadExcel}
            className="btn-download sm:hidden block"
          >
            <IoDocument color="white" />
          </button>
          <button onClick={printPDF} className="btn-pdf sm:hidden block">
            <IoDocument color="white" />
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="input"
            placeholder="Cari Nama / NIP"
            value={searchText}
            onChange={handleSearchChange}
          />
          <select
            value={pegawaiPerPage}
            onChange={(e) => {
              setPegawaiPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page on change
            }}
            className="p-2 border border-gray-300 rounded"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Pegawai</th>
              <th className="py-3 px-6 text-left">NIP</th>
              <th className="py-3 px-6 text-left">Pangkat/Golongan</th>
              <th className="py-3 px-6 text-left">Jenis Pegawai</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredPegawai.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * pegawaiPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">{item.nama_pegawai}</td>
                <td className="py-3 px-6 text-left">{item.NIP}</td>
                <td className="py-3 px-6 text-left">{item.pangkat_gol}</td>
                <td className="py-3 px-6 text-left">{item.jenis_pegawai}</td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    onClick={() =>
                      navigate(`/lapasi/data-pegawai/detail-pegawai/${item.id}`)
                    }
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" />
                  </button>
                  <button
                    className="edit"
                    title="Edit"
                    onClick={() => handleOpenModalEdit(item)}
                  >
                    <MdModeEdit color="white" />
                  </button>
                  <button
                    className="delete"
                    onClick={() => hapusPegawai(item.id)}
                    title="Hapus"
                  >
                    <MdDelete color="white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="flex justify-center mt-4">
        <ul className="flex space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => handlePageChange(number)}
                className={`px-3 py-1 rounded ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DataPegawai;
