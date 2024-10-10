import { prismaClient } from '../prisma';
import { Menu } from '../types/menu';

export const menuSeeder = async (): Promise<Menu[]> => {
  const menus: Menu[] = [
    {
      label: 'Dashboard',
      order: 1,
      icon: 'LuGaugeCircle',
      pathname: '/',
      status: true,
      is_submenu: false,
    },
    {
      label: 'Data Pasien',
      order: 2,
      icon: 'LuLayoutList',
      pathname: '/patient',
      status: true,
      is_submenu: false,
    },
    {
      label: 'Antrean',
      order: 3,
      icon: 'LuTicket',
      status: true,
      is_submenu: true,
      submenus: [
        { label: 'Data Antrean', pathname: '/queue/data' },
        { label: 'Panggil Antrean', pathname: '/queue/call' },
        { label: 'Master Loket Antrean', pathname: '/queue/counter' },
      ],
    },
    {
      label: 'Pendaftaran Pasien',
      order: 4,
      icon: 'LuFileEdit',
      status: true,
      is_submenu: true,
      submenus: [
        { label: 'Pendaftaran Onsite', pathname: '/register/onsite' },
        {
          label: 'Online dan Reservasi',
          pathname: '/register/online-reservation',
        },
      ],
    },
    {
      label: 'Rawat Jalan',
      order: 5,
      icon: 'LuPersonStanding',
      status: true,
      is_submenu: true,
      submenus: [
        { label: 'Panggil Antrean Rajal', pathname: '/outpatient/call-queue' },
        { label: 'Pemeriksaan Rajal', pathname: '/outpatient/examination' },
      ],
    },
    {
      label: 'Jadwal Praktik Dokter',
      order: 6,
      icon: 'LuCalendarDays',
      status: true,
      is_submenu: true,
      submenus: [
        {
          label: 'Penjadwalan Dokter',
          pathname: '/doctor-schedule/scheduling',
        },
        {
          label: 'Jadwal Dokter Hari ini',
          pathname: '/doctor-schedule/today-schedule',
        },
        {
          label: 'Tambah Kuota Dokter',
          pathname: '/doctor-schedule/doctor-quota',
        },
        { label: 'Izin Libur', pathname: '/doctor-schedule/vacation' },
      ],
    },
    {
      label: 'Kamar',
      order: 7,
      icon: 'LuBedSingle',
      status: true,
      is_submenu: true,
      submenus: [
        { label: 'Jenis Kamar', pathname: '/room/type' },
        { label: 'Kelas Kamar', pathname: '/room/class' },
        { label: 'Kamar dan Bed', pathname: '/room/bed' },
        { label: 'Ketersediaan Kamar', pathname: '/room/availability' },
      ],
    },
    {
      label: 'Pagawai',
      order: 8,
      icon: 'LuContact',
      status: true,
      is_submenu: true,
      submenus: [{ label: 'Data Pegawai', pathname: '/employee' }],
    },
    {
      label: 'Unit Kerja',
      order: 9,
      icon: 'LuBuilding',
      status: true,
      pathname: '/work-unit',
      is_submenu: false,
    },
    {
      label: 'Data BPJS',
      order: 10,
      icon: 'LuBadgeCheck',
      status: true,
      is_submenu: true,
      submenus: [
        { label: 'Dokter BPJS', pathname: '/bpjs/doctor' },
        { label: 'Unit BPJS', pathname: '/bpjs/unit' },
      ],
    },
    {
      label: 'Data Master',
      order: 11,
      icon: 'LuDatabase',
      status: true,
      is_submenu: true,
      submenus: [
        { label: 'Agama', pathname: '/master/religion' },
        { label: 'Negara', pathname: '/master/country' },
        { label: 'Provinsi', pathname: '/master/province' },
        { label: 'Kabupaten/Kota', pathname: '/master/regency' },
        { label: 'Kecamatan', pathname: '/master/district' },
        { label: 'Kelurahan/Desa', pathname: '/master/village' },
        { label: 'Golongan Darah', pathname: '/master/blood-type' },
        { label: 'Spesialis Dokter', pathname: '/master/doctor-specialist' },
        {
          label: 'Jabatan Struktural',
          pathname: '/master/structural-position',
        },
        { label: 'Kategori Pegawai', pathname: '/master/employee-category' },
        { label: 'Jenis Pegawai', pathname: '/master/employee-type' },
        { label: 'Status Pegawai', pathname: '/master/employee-status' },
        { label: 'Status Kawin', pathname: '/master/marital-status' },
        { label: 'Status Keluarga', pathname: '/master/family-status' },
        { label: 'Status Sosial', pathname: '/master/social-status' },
        { label: 'Pangkat/Golongan', pathname: '/master/rank-or-class' },
      ],
    },
  ];
  console.log('Seeding menu...');
  return Promise.all(
    menus.map(async (menu) => {
      const menuResult = await prismaClient.menu.create({
        data: {
          label: menu.label,
          order: menu.order,
          icon: menu.icon,
          pathname: menu?.pathname || null,
          status: menu.status,
          is_submenu: menu.is_submenu,
        },
      });

      if (menuResult.is_submenu) {
        const submenus = await Promise.all(
          menu.submenus.map((submenu) => {
            return prismaClient.submenu.create({
              data: {
                label: submenu.label,
                pathname: submenu.pathname,
                id_menu: menuResult.id,
              },
            });
          }),
        );
        menuResult['submenus'] = submenus.map((submenu) => ({
          id: submenu.id,
          label: submenu.label,
          pathname: submenu.pathname,
        }));
      }
      return menuResult;
    }),
  );
};
