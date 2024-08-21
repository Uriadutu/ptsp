import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoAdd, IoDocument } from "react-icons/io5";
import AddOrganisasiModal from "../Modal/PaludiModal/AddOrganisasiModal";
import * as XLSX from "xlsx";
import OrganisasiPaludiPDF from "../../Export/PaludiExport/OrganisasiPaludiPDF";
import { useReactToPrint } from "react-to-print";

const DataOrganisasiKristen = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [organisasiMasyarakat, setOrganisasiMasyarakat] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [organisasiPerPage] = useState(50);
  const ComponentToPDF = useRef();

  const getOrganisasiMasyarakat = async () => {
    try {
      const response = await axios.get(
        "http://192.168.85.20:3005/organisasi/kristen"
      );
      setOrganisasiMasyarakat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusOrganisasi = async (id) => {
    try {
      await axios.delete(`http://192.168.85.20:3005/organisasi/kristen/${id}`);
      getOrganisasiMasyarakat();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganisasiMasyarakat();
  }, []);

  const filteredOrganisasi = organisasiMasyarakat.filter((item) =>
    item.nama_organisasi.toLowerCase().includes(searchText.toLowerCase())
  );

  const downloadExcel = () => {
    const dataToExport = filteredOrganisasi.map((item, index) => ({
      No: index + 1,
      "Nama Organisasi": item.nama_organisasi,
      "Pimpinan Organisasi": item.nama_pimpinan,
      "Tahun Berdiri": item.tahun_berdiri,
      "Jumlah Anggota": item.jumlah_anggota,
      Periode: item.tahun_periode,
      Alamat: item.alamat,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataOrganisasi");
    XLSX.writeFile(workbook, "DataOrganisasi.xlsx");
  };

  const indexOfLastOrganisasi = currentPage * organisasiPerPage;
  const indexOfFirstOrganisasi = indexOfLastOrganisasi - organisasiPerPage;
  const currentOrganisasi = filteredOrganisasi.slice(
    indexOfFirstOrganisasi,
    indexOfLastOrganisasi
  );

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredOrganisasi.length / organisasiPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const printPDF = useReactToPrint({
      content: () => ComponentToPDF.current,
      documentTitle: `DataOrganisasiMasyarakat(paludi).pdf`,
    });
  return (
    <div className="contain">
      {openModalAdd && (
        <AddOrganisasiModal
          setIsOpenModalAdd={setOpenModalAdd}
          getOrganisasi={getOrganisasiMasyarakat}
        />
      )}
      <div style={{ display: "none" }}>
        <OrganisasiPaludiPDF
          ref={ComponentToPDF}
          organisasi={organisasiMasyarakat}
        />
      </div>
      <h1 className="judul mb-4">Data Organisasi Masyarakat</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Organisasi
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
        <div className="flex justify-between items-center">
          <input
            type="text"
            className="input"
            placeholder="Cari Nama Gereja"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Organisasi</th>
              <th className="py-3 px-6 text-left">Pimpinan Organisasi</th>
              <th className="py-3 px-6 text-left">Tahun Berdiri</th>
              <th className="py-3 px-6 text-left">Jumlah Anggota</th>
              <th className="py-3 px-6 text-left">Periode</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentOrganisasi.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{item.nama_organisasi}</td>
                <td className="py-3 px-6 text-left">{item.nama_pimpinan}</td>
                <td className="py-3 px-6 text-left">{item.tahun_berdiri}</td>
                <td className="py-3 px-6 text-left">{item.jumlah_anggota}</td>
                <td className="py-3 px-6 text-left">{item.tahun_periode}</td>
                <td className="py-3 px-6 text-left">{item.alamat}</td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="delete"
                    onClick={() => hapusOrganisasi(item.id)}
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
                onClick={() => paginate(number)}
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

export default DataOrganisasiKristen;
