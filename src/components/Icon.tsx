import { BsWhatsapp } from 'react-icons/bs'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { FaRegWindowRestore } from 'react-icons/fa6'
import { GrFormSubtract } from 'react-icons/gr'
import { HiDotsVertical } from 'react-icons/hi'
import { IoMdAdd, IoMdCalendar, IoMdSwap } from 'react-icons/io'
import {
  IoPersonAddOutline,
  IoPersonOutline,
  IoPersonSharp
} from 'react-icons/io5'
import { LiaBroomSolid } from 'react-icons/lia'
import { LuComponent } from 'react-icons/lu'
import {
  MdAttachMoney,
  MdCheckCircle,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdDeleteOutline,
  MdDownload,
  MdEdit,
  MdError,
  MdFilterList,
  MdListAlt,
  MdLocationOff,
  MdLocationPin,
  MdMessage,
  MdOutlineDone,
  MdOutlineSearch,
  MdOutlineStorefront,
  MdSave,
  MdSettings
} from 'react-icons/md'
import { PiUserList } from 'react-icons/pi'
import { TbMapSearch } from 'react-icons/tb'
import { TiPhone } from 'react-icons/ti'

// https://react-icons.github.io/react-icons/
const icons = {
  up: FaChevronUp,
  down: FaChevronDown,
  close: MdClose,
  store: MdOutlineStorefront,
  orders: MdListAlt,
  profile: IoPersonOutline,
  profileFill: IoPersonSharp,
  profileAdd: IoPersonAddOutline,
  components: LuComponent,
  myOrders: PiUserList,
  list: MdListAlt,
  add: IoMdAdd,
  edit: MdEdit,
  money: MdAttachMoney,
  save: MdSave,
  location: MdLocationPin,
  locationOff: MdLocationOff,
  filter: MdFilterList,
  windows: FaRegWindowRestore,
  broom: LiaBroomSolid,
  swap: IoMdSwap,
  delete: MdDeleteOutline,
  search: MdOutlineSearch,
  map: TbMapSearch,
  calendar: IoMdCalendar,
  verticalDots: HiDotsVertical,
  sub: GrFormSubtract,
  phone: TiPhone,
  whatsapp: BsWhatsapp,
  done: MdOutlineDone,
  error: MdError,
  checkCircle: MdCheckCircle,
  message: MdMessage,
  // print: PrintIcon,
  // medicalInfo: MedicalInformationIcon,
  // restore: RestoreIcon,
  // favorite: FavoriteIcon,
  // archive: ArchiveIcon,
  // person: PersonIcon,
  // search: SearchIcon,
  // bike: DirectionsBikeIcon,
  // store: StoreIcon,
  // trash: DeleteForeverIcon,
  // delivery: LocalShippingIcon,
  // fix: BuildIcon,
  // settings: SettingsIcon,
  // sales: AttachMoneyIcon,
  // cashbox: PointOfSaleIcon,
  // substr: RemoveIcon,
  // eye: VisibilityIcon,
  // info: InfoIcon,
  // switch: LoopIcon,
  // dashboard: Dashboard,
  // settingsApplications: SettingsApplicationsIcon,
  // recordVoiceOver: RecordVoiceOverIcon,
  // phone: PhoneIcon,
  // mail: EmailIcon,
  // whatsapp: WhatsAppIcon,
  // location: LocationOnIcon,
  // addComment: AddCommentIcon,
  // order: ReceiptLongIcon,
  // change: ChangeCircleIcon,
  // google: GoogleIcon
  rowLeft: MdChevronLeft,
  rowRight: MdChevronRight,
  settings: MdSettings,
  download: MdDownload
} as const

export type IconName = keyof typeof icons
const Icon = ({
  icon,
  size = 30,
  className,
  ...props
}: {
  icon: IconName
  color?: string
  size?: number
  className?: string
}) => {
  const Component = icons[icon]
  if (!Component) return <>Icon</>
  return <Component size={size} className={className} {...props} />
}
export default Icon
