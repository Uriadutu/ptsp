import React, { useState } from "react";
import axios from "axios";

const AddPeriodeModal = ({ setIsOpenModalAdd, getPeriode }) => {
  const [Tanggal, setTanggal] = useState("");
  const [JumlahJamaah, setJumlahJamaah] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://192.168.85.20:3005/periode/haji", {
        tanggal: Tanggal,
        jumlah_jamaah: JumlahJamaah,
      });

      setIsOpenModalAdd(false);
      getPeriode();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30 "
    >
      <form onSubmit={handleSubmit} className=" inline">
        <div className="w-full bg-white rounded-lg shadow-lg h-full inline-block">
          <div className="flex items-center justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah Periode
            </h3>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 space-y-4 inline-block h-[75%] overflow-y-scroll">
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="Tanggal" className="label-input">
                  Tanggal
                </label>
                <input
                  value={Tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  type="date"
                  id="Tanggal"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="JumlahJamaah" className="label-input">
                  Jumlah Jamaah Haji
                </label>
                <input
                  value={JumlahJamaah}
                  onChange={(e) => setJumlahJamaah(e.target.value)}
                  type="text"
                  id="JumlahJamaah"
                  className="w-full input"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
            <button type="submit" className="btn btn-simpan">
              Simpan
            </button>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="btn-batal"
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPeriodeModal;
