import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  UserCheck, 
  CreditCard, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Download,
  LogOut,
  Search,
  Filter,
  X
} from 'lucide-react';

const BackOfficeDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const [patients, setPatients] = useState([
    {
      id: 1,
      nama: 'John Doe',
      nomor_hp: '08123456789',
      email: 'john@example.com',
      keluhan: 'Sakit punggung',
      riwayat_penyakit: 'Hipertensi',
      kondisi: 'Stabil',
      alamat: {
        jalan: 'Jl. Merdeka No. 123 RT 01 RW 02',
        kelurahan: 'Depok',
        kecamatan: 'Pancoran Mas',
        kota: 'Depok',
        provinsi: 'Jawa Barat',
        koordinat: '-6.4025, 106.7942'
      }
    },
    {
      id: 2,
      nama: 'Jane Smith',
      nomor_hp: '08123456790',
      email: 'jane@example.com',
      keluhan: 'Nyeri sendi',
      riwayat_penyakit: 'Diabetes',
      kondisi: 'Perlu Monitoring',
      alamat: {
        jalan: 'Jl. Sudirman No. 456 RT 03 RW 04',
        kelurahan: 'Beji',
        kecamatan: 'Beji',
        kota: 'Depok',
        provinsi: 'Jawa Barat',
        koordinat: '-6.3728, 106.8324'
      }
    }
  ]);

  const [reservations, setReservations] = useState([
    {
      id: 1,
      tanggal_pemesanan: '2024-01-15',
      kode_antrian: 'ANT001',
      nama_pasien: 'John Doe',
      wilayah: 'Depok',
      layanan: 'Fisioterapi Punggung',
      jumlah_visit: 3,
      detail: {
        tanggal_visit: '2024-01-20',
        jam_visit: '10:00',
        nama_fisioterapis: 'Dr. Ahmad',
        jenis_terapis: 'Karpis',
        status_visit: 'Menunggu Konfirmasi Pasien'
      }
    },
    {
      id: 2,
      tanggal_pemesanan: '2024-01-16',
      kode_antrian: 'ANT002',
      nama_pasien: 'Jane Smith',
      wilayah: 'Depok',
      layanan: 'Fisioterapi Sendi',
      jumlah_visit: 5,
      detail: {
        tanggal_visit: '2024-01-21',
        jam_visit: '14:00',
        nama_fisioterapis: 'Dr. Sarah',
        jenis_terapis: 'Mitra',
        status_visit: 'Menunggu Pembayaran'
      }
    }
  ]);

  const [therapists, setTherapists] = useState([
    {
      id: 1,
      nama: 'Dr. Ahmad Fisioterapi',
      id_terapis: 'FT001',
      jenis_terapis: 'Karpis',
      wilayah_jangkauan: 'Depok, Bogor',
      alamat: {
        jalan: 'Jl. Kesehatan No. 789 RT 05 RW 06',
        kelurahan: 'Margonda',
        kecamatan: 'Pancoran Mas',
        kota: 'Depok',
        provinsi: 'Jawa Barat',
        koordinat: '-6.3754, 106.8310'
      },
      email: 'ahmad@fisioterapi.com',
      nomor_hp: '08123456791',
      nomor_str: 'STR123456789',
      kontak_darurat: '08123456792'
    },
    {
      id: 2,
      nama: 'Dr. Sarah Rehabilitasi',
      id_terapis: 'FT002',
      jenis_terapis: 'Mitra',
      wilayah_jangkauan: 'Depok, Jakarta Selatan',
      alamat: {
        jalan: 'Jl. Medika No. 321 RT 07 RW 08',
        kelurahan: 'Beji',
        kecamatan: 'Beji',
        kota: 'Depok',
        provinsi: 'Jawa Barat',
        koordinat: '-6.3668, 106.8324'
      },
      email: 'sarah@fisioterapi.com',
      nomor_hp: '08123456793',
      nomor_str: 'STR987654321',
      kontak_darurat: '08123456794'
    }
  ]);

  const [payments, setPayments] = useState([
    {
      id: 1,
      nomor_invoice: 'INV001',
      nama_pasien: 'John Doe',
      jumlah_visit: 3,
      jenis_paket: 'Paket Basic',
      harga_satuan: 150000,
      status_pembayaran: 'Lunas',
      alamat_pasien: 'Jl. Merdeka No. 123, Depok',
      email_pasien: 'john@example.com',
      bukti_pembayaran: 'bukti_001.jpg'
    },
    {
      id: 2,
      nomor_invoice: 'INV002',
      nama_pasien: 'Jane Smith',
      jumlah_visit: 5,
      jenis_paket: 'Paket Premium',
      harga_satuan: 200000,
      status_pembayaran: 'Pending',
      alamat_pasien: 'Jl. Sudirman No. 456, Depok',
      email_pasien: 'jane@example.com',
      bukti_pembayaran: null
    }
  ]);

  // Login Component
  const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
      e.preventDefault();
      if (username === 'admin' && password === 'admin123') {
        setIsAuthenticated(true);
        setCurrentUser({ username: 'admin', role: 'Administrator' });
      } else {
        alert('Username atau password salah!');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Back Office Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan username"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4 text-sm">
            Demo: admin / admin123
          </p>
        </div>
      </div>
    );
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X size={20} />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  // Dashboard Stats
  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Total Pasien</p>
            <p className="text-2xl font-bold text-blue-600">{patients.length}</p>
          </div>
          <Users className="text-blue-600" size={32} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Reservasi Aktif</p>
            <p className="text-2xl font-bold text-green-600">{reservations.length}</p>
          </div>
          <Calendar className="text-green-600" size={32} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Fisioterapis</p>
            <p className="text-2xl font-bold text-purple-600">{therapists.length}</p>
          </div>
          <UserCheck className="text-purple-600" size={32} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Pembayaran</p>
            <p className="text-2xl font-bold text-orange-600">{payments.length}</p>
          </div>
          <CreditCard className="text-orange-600" size={32} />
        </div>
      </div>
    </div>
  );

  // Patient Management
  const PatientManagement = () => {
    const filteredPatients = patients.filter(patient =>
      patient.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddPatient = () => {
      setModalType('add-patient');
      setEditingItem(null);
      setShowModal(true);
    };

    const handleEditPatient = (patient) => {
      setModalType('edit-patient');
      setEditingItem(patient);
      setShowModal(true);
    };

    const handleDeletePatient = (id) => {
      if (window.confirm('Apakah Anda yakin ingin menghapus pasien ini?')) {
        setPatients(patients.filter(p => p.id !== id));
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Data Profil Pasien</h2>
            <button 
              onClick={handleAddPatient}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={16} />
              Tambah Pasien
            </button>
          </div>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Cari pasien..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. HP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keluhan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kondisi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.nama}</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.nomor_hp}</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.email}</td>
                    Rp {(payment.harga_satuan * payment.jumlah_visit).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      payment.status_pembayaran === 'Lunas' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status_pembayaran}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleGenerateInvoice(payment)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Generate PDF"
                      >
                        <Download size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Sidebar
  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Users },
      { id: 'patients', label: 'Profil Pasien', icon: Users },
      { id: 'reservations', label: 'Reservasi', icon: Calendar },
      { id: 'therapists', label: 'Fisioterapis', icon: UserCheck },
      { id: 'payments', label: 'Pembayaran', icon: CreditCard },
    ];

    return (
      <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Back Office</h1>
          <p className="text-gray-400 text-sm">Fisioterapi Management</p>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setSearchTerm('');
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  activeMenu === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">A</span>
            </div>
            <div>
              <p className="text-sm font-medium">{currentUser?.username}</p>
              <p className="text-xs text-gray-400">{currentUser?.role}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setCurrentUser(null);
              setActiveMenu('dashboard');
            }}
            className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-900 hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    );
  };

  // Patient Form Modal
  const PatientFormModal = () => {
    const [formData, setFormData] = useState(editingItem || {
      nama: '',
      nomor_hp: '',
      email: '',
      keluhan: '',
      riwayat_penyakit: '',
      kondisi: 'Stabil',
      alamat: {
        jalan: '',
        kelurahan: '',
        kecamatan: '',
        kota: '',
        provinsi: '',
        koordinat: ''
      }
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingItem) {
        setPatients(patients.map(p => p.id === editingItem.id ? { ...formData, id: editingItem.id } : p));
      } else {
        setPatients([...patients, { ...formData, id: Date.now() }]);
      }
      setShowModal(false);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({...formData, nama: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
            <input
              type="tel"
              value={formData.nomor_hp}
              onChange={(e) => setFormData({...formData, nomor_hp: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keluhan</label>
            <textarea
              value={formData.keluhan}
              onChange={(e) => setFormData({...formData, keluhan: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Riwayat Penyakit</label>
            <textarea
              value={formData.riwayat_penyakit}
              onChange={(e) => setFormData({...formData, riwayat_penyakit: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kondisi</label>
          <select
            value={formData.kondisi}
            onChange={(e) => setFormData({...formData, kondisi: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Stabil">Stabil</option>
            <option value="Perlu Monitoring">Perlu Monitoring</option>
            <option value="Kritis">Kritis</option>
          </select>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Alamat</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jalan, RT/RW, No. Rumah</label>
            <input
              type="text"
              value={formData.alamat.jalan}
              onChange={(e) => setFormData({...formData, alamat: {...formData.alamat, jalan: e.target.value}})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Jl. Contoh No. 123 RT 01 RW 02"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kelurahan</label>
              <input
                type="text"
                value={formData.alamat.kelurahan}
                onChange={(e) => setFormData({...formData, alamat: {...formData.alamat, kelurahan: e.target.value}})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
              <input
                type="text"
                value={formData.alamat.kecamatan}
                onChange={(e) => setFormData({...formData, alamat: {...formData.alamat, kecamatan: e.target.value}})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kota/Kabupaten</label>
              <input
                type="text"
                value={formData.alamat.kota}
                onChange={(e) => setFormData({...formData, alamat: {...formData.alamat, kota: e.target.value}})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
              <input
                type="text"
                value={formData.alamat.provinsi}
                onChange={(e) => setFormData({...formData, alamat: {...formData.alamat, provinsi: e.target.value}})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titik Koordinat</label>
            <input
              type="text"
              value={formData.alamat.koordinat}
              onChange={(e) => setFormData({...formData, alamat: {...formData.alamat, koordinat: e.target.value}})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="-6.4025, 106.7942"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {editingItem ? 'Update' : 'Simpan'}
          </button>
        </div>
      </form>
    );
  };

  // Reservation Detail Modal
  const ReservationDetailModal = () => {
    if (!editingItem) return null;

    const statusColors = {
      'Menunggu Konfirmasi Pasien': 'bg-yellow-100 text-yellow-800',
      'Menunggu Konfirmasi Fisioterapis': 'bg-orange-100 text-orange-800',
      'Menunggu Pembayaran': 'bg-red-100 text-red-800',
      'Menunggu Kunjungan': 'bg-blue-100 text-blue-800',
      'Kunjungan Selesai': 'bg-green-100 text-green-800'
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Informasi Reservasi</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Kode Antrian:</span>
                <span className="font-medium">{editingItem.kode_antrian}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal Pemesanan:</span>
                <span className="font-medium">{editingItem.tanggal_pemesanan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nama Pasien:</span>
                <span className="font-medium">{editingItem.nama_pasien}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Wilayah:</span>
                <span className="font-medium">{editingItem.wilayah}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Layanan:</span>
                <span className="font-medium">{editingItem.layanan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jumlah Visit:</span>
                <span className="font-medium">{editingItem.jumlah_visit}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Detail Kunjungan</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal Visit:</span>
                <span className="font-medium">{editingItem.detail.tanggal_visit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jam Visit:</span>
                <span className="font-medium">{editingItem.detail.jam_visit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fisioterapis:</span>
                <span className="font-medium">{editingItem.detail.nama_fisioterapis}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jenis Terapis:</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  editingItem.detail.jenis_terapis === 'Karpis' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {editingItem.detail.jenis_terapis}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[editingItem.detail.status_visit]}`}>
                  {editingItem.detail.status_visit}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Tutup
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Edit Status
          </button>
        </div>
      </div>
    );
  };

  // Main Content
  const MainContent = () => {
    return (
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {activeMenu === 'dashboard' && 'Dashboard'}
            {activeMenu === 'patients' && 'Profil Pasien'}
            {activeMenu === 'reservations' && 'Data Reservasi'}
            {activeMenu === 'therapists' && 'Profil Fisioterapis'}
            {activeMenu === 'payments' && 'Pembayaran'}
          </h1>
        </div>

        {activeMenu === 'dashboard' && (
          <div>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Reservasi Terbaru</h3>
                <div className="space-y-3">
                  {reservations.slice(0, 5).map((reservation) => (
                    <div key={reservation.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{reservation.kode_antrian}</p>
                        <p className="text-gray-600 text-sm">{reservation.nama_pasien}</p>
                      </div>
                      <span className="text-sm text-gray-500">{reservation.tanggal_pemesanan}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Pembayaran Pending</h3>
                <div className="space-y-3">
                  {payments.filter(p => p.status_pembayaran === 'Pending').map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{payment.nomor_invoice}</p>
                        <p className="text-gray-600 text-sm">{payment.nama_pasien}</p>
                      </div>
                      <span className="text-sm text-orange-600 font-medium">
                        Rp {(payment.harga_satuan * payment.jumlah_visit).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeMenu === 'patients' && <PatientManagement />}
        {activeMenu === 'reservations' && <ReservationManagement />}
        {activeMenu === 'therapists' && <TherapistManagement />}
        {activeMenu === 'payments' && <PaymentManagement />}
      </div>
    );
  };

  // Modal Content Renderer
  const renderModalContent = () => {
    switch (modalType) {
      case 'add-patient':
      case 'edit-patient':
        return <PatientFormModal />;
      case 'view-reservation':
        return <ReservationDetailModal />;
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'add-patient':
        return 'Tambah Pasien';
      case 'edit-patient':
        return 'Edit Pasien';
      case 'view-reservation':
        return 'Detail Reservasi';
      default:
        return '';
    }
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <MainContent />
      
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title={getModalTitle()}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default BackOfficeDashboard;6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.nomor_hp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.keluhan}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      patient.kondisi === 'Stabil' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {patient.kondisi}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditPatient(patient)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeletePatient(patient.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Reservation Management
  const ReservationManagement = () => {
    const filteredReservations = reservations.filter(reservation =>
      reservation.kode_antrian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.nama_pasien.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewDetail = (reservation) => {
      setModalType('view-reservation');
      setEditingItem(reservation);
      setShowModal(true);
    };

    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Data Reservasi</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus size={16} />
              Tambah Reservasi
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Cari reservasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Antrian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pasien</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wilayah</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Layanan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.tanggal_pemesanan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800"
                      onClick={() => handleViewDetail(reservation)}>
                    {reservation.kode_antrian}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.nama_pasien}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.wilayah}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.layanan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.jumlah_visit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewDetail(reservation)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Therapist Management
  const TherapistManagement = () => {
    const filteredTherapists = therapists.filter(therapist =>
      therapist.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.id_terapis.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Profil Fisioterapis</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus size={16} />
              Tambah Fisioterapis
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Cari fisioterapis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Terapis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wilayah</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. HP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTherapists.map((therapist) => (
                <tr key={therapist.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{therapist.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{therapist.id_terapis}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      therapist.jenis_terapis === 'Karpis' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {therapist.jenis_terapis}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{therapist.wilayah_jangkauan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{therapist.nomor_hp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{therapist.nomor_str}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Payment Management
  const PaymentManagement = () => {
    const filteredPayments = payments.filter(payment =>
      payment.nomor_invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.nama_pasien.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleGenerateInvoice = (payment) => {
      alert(`Generating PDF invoice for ${payment.nomor_invoice}`);
    };

    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Pembayaran</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus size={16} />
              Tambah Pembayaran
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Cari pembayaran..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pasien</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paket</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.nomor_invoice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.nama_pasien}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.jumlah_visit}</td>
                  <td className="px-
