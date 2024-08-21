import React, { useEffect, useState } from "react";
import logoKemenag from "../../img/depag.png";
import { tanggalPDF } from "../../utils/helper";
import axios from "axios";

const SekolahPaludiPDF = React.forwardRef(({}, ref) => {
  const [sds, setSds] = useState([]);
  const [sdn, setSdn] = useState([]);
  const [smps, setSmps] = useState([]);
  const [smpn, setSmpn] = useState([]);
  const [smas, setSmas] = useState([]);
  const [sman, setSman] = useState([]);

  const getSekolahbyStatus = async (s, set) => {
    try {
      const response = await axios.get(
        `http://192.168.85.20:3005/sekolah-kristen/status/${s}`
      );
      set(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSekolahbyStatus("sekolah-dasarnegeri", setSdn);
    getSekolahbyStatus("sekolah-dasarswasta", setSds);
    getSekolahbyStatus("sekolah-menengah-pertamanegeri", setSmpn);
    getSekolahbyStatus("sekolah-menengah-pertamaswasta", setSmps);
    getSekolahbyStatus("sekolah-menengah-atasnegeri", setSman);
    getSekolahbyStatus("sekolah-menengah-atasswasta", setSmas);
  }, [setSdn, setSds, setSmpn, setSmps, setSman, setSmas]);

  return (
    <div ref={ref} className="py-3 pl-4 pr-3 mx-5 mt-10">
      <div className="flex items-center justify-center mb-5 pb-4 border-b-2 border-separate border-black">
        <div className="flex items-end w-full relative">
          <div className="absolute left-0">
            <img src={logoKemenag} alt="" className="w-[80px]" />
          </div>
          <div className="w-full flex justify-center ">
            <div className="">
              <h1 className="text-center text-xl font-bold ">
                Kantor Kementrian Agama Kabupaten Halmahera Barat
              </h1>
              <p className="text-center">
                Jln. Pengabdian Nomor 03 Kompleks Kantor Bupati Jailolo 97752
              </p>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center mb-2">DATA SEKOLAH PALUDI</h1>
      <div className="mt-4">
        <h1 className="text-left mb-1">Layanan Seksi Bimas Kristen (Paludi)</h1>
        <h1 className="text-left mb-2">
          Tanggal <span className="ml-4">: {tanggalPDF(new Date())}</span>
        </h1>
        <h1 className="text-left mb-2 font-semibold mt-4">
          Sekolah Dasar (Negeri) :
        </h1>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Sekolah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              NSS
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Alamat
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No Telepon
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tahun Berdiri
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Akreditasi
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Bangunan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Sk Izin
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Req Pendirian
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jumlah Rombel
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Kepala Sekolah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              NIP Kepala Sekolah
            </th>
          </tr>
        </thead>
        <tbody>
          {sdn.length > 0 ? (
            sdn.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-left">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_sekolah}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nss}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.alamat}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.no_telp}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.tahun_berdiri}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.status_akreditasi}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.status_bangunan}
                </td>

                <td className="border border-gray-300 p-2 text-left">
                  {item.sk_ijin}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.no_reqPendirian}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.jumlah_rombel}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_kepsek}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nip_kepsek}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={13}
              >
                Data Sekolah Belum ada
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h1 className="text-left mb-2 font-semibold mt-4">
        Sekolah Dasar (Swasta) :
      </h1>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Sekolah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              NSS
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Alamat
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No Telepon
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tahun Berdiri
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Akreditasi
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Bangunan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Sk Izin
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Req Pendirian
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jumlah Rombel
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Kepala Sekolah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              NIP Kepala Sekolag
            </th>
          </tr>
        </thead>
        <tbody>
          {sds.length > 0 ? (
            sds.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-left">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_sekolah}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nss}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.alamat}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.no_telp}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.tahun_berdiri}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.status_akreditasi}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.status_bangunan}
                </td>

                <td className="border border-gray-300 p-2 text-left">
                  {item.sk_izin}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.req_pendirian}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.jumlah_rombel}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_kepsek}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nip_kepsek}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="border border-gray-300 p-2 text-center"
                colSpan={13}
              >
                Data Sekolah Belum ada
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h1 className="text-left mb-2 font-semibold mt-4">
        Sekolah Menengah Pertama (Negeri) :
      </h1>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Sekolah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              NSS
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Alamat
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No Telepon
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tahun Berdiri
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Akreditasi
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Bangunan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Sk Izin
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Req Pendirian
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jumlah Rombel
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Kepala Sekolah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              NIP Kepala Sekolag
            </th>
          </tr>
        </thead>
        <tbody>
          {smpn.length > 0 ? (
            smpn.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-left">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_sekolah}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nss}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.alamat}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.no_telp}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.tahun_berdiri}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.status_akreditasi}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.status_bangunan}
                </td>

                <td className="border border-gray-300 p-2 text-left">
                  {item.sk_izin}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.req_pendirian}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.jumlah_rombel}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_kepsek}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nip_kepsek}
                </td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
          <td className="border border-gray-300 p-2 text-center" colSpan={13}>
            Data Sekolah Belum ada
          </td>
        </tbody>
      </table>
      <h1 className="text-left mb-2 font-semibold mt-4">
        Sekolah Menengah Pertama (Swasta) :
      </h1>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Sekolah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              NSS
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Alamat
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No Telepon
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tahun Berdiri
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Akreditasi
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Bangunan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Sk Izin
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Req Pendirian
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jumlah Rombel
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Kepala Sekolah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              NIP Kepala Sekolag
            </th>
          </tr>
        </thead>
        <tbody>
          {smps.length > 0 ? (
            smps.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-left">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_sekolah}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nss}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.alamat}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.no_telp}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.tahun_berdiri}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.status_akreditasi}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.status_bangunan}
                </td>

                <td className="border border-gray-300 p-2 text-left">
                  {item.sk_izin}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.req_pendirian}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.jumlah_rombel}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_kepsek}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nip_kepsek}
                </td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
          <td className="border border-gray-300 p-2 text-center" colSpan={13}>
            Data Sekolah Belum ada
          </td>
        </tbody>
      </table>

      <h1 className="text-left mb-2 font-semibold mt-4">
        Sekolah Menengah Atas (Negeri) :
      </h1>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Sekolah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              NSS
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Alamat
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No Telepon
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tahun Berdiri
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Akreditasi
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Bangunan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Sk Izin
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Req Pendirian
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jumlah Rombel
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Kepala Sekolah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              NIP Kepala Sekolag
            </th>
          </tr>
        </thead>
        <tbody>
          {sman.length > 0 ? (
            sman.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-left">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_sekolah}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nss}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.alamat}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.no_telp}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.tahun_berdiri}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.status_akreditasi}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.status_bangunan}
                </td>

                <td className="border border-gray-300 p-2 text-left">
                  {item.sk_izin}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.req_pendirian}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.jumlah_rombel}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_kepsek}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nip_kepsek}
                </td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
          <td className="border border-gray-300 p-2 text-center" colSpan={13}>
            Data Sekolah Belum ada
          </td>
        </tbody>
      </table>
      <h1 className="text-left mb-2 font-semibold mt-4">
        Sekolah Menengah Atas (Swasta) :
      </h1>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Sekolah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              NSS
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Alamat
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No Telepon
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tahun Berdiri
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Akreditasi
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Bangunan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Sk Izin
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Req Pendirian
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jumlah Rombel
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Kepala Sekolah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              NIP Kepala Sekolag
            </th>
          </tr>
        </thead>
        <tbody>
          {smas.length > 0 ? (
            smas.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-left">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_sekolah}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nss}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.alamat}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.no_telp}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.tahun_berdiri}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.status_akreditasi}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.status_bangunan}
                </td>

                <td className="border border-gray-300 p-2 text-left">
                  {item.sk_izin}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.req_pendirian}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.jumlah_rombel}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_kepsek}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nip_kepsek}
                </td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
          <td className="border border-gray-300 p-2 text-center" colSpan={13}>
            Data Sekolah Belum ada
          </td>
        </tbody>
      </table>
    </div>
  );
});

export default SekolahPaludiPDF;
