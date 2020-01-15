
//---------- Class Variable---------------------

/*------- Mastr --------*/

export class GetGroupDate {
    id: number;
    name: string;
}

export class GetPickupReturn {
    id: number;
    code: string;
    name: string;
    is_active: string;
    is_pickup: string;
}

export class GetAgentContainer {
    id: number;
    code: string;
    name: string;
    is_active: string;
}

export class GetPlant {
    id: number;
    name: string;
    is_active: string;
}

export class GetStorage {
    id: number;
    storage_code: string;
    storage_name: string;
    is_active: string;
}

export class GetShipmentType {
    id: number;
    code: string;
    description: string;
}

export class GetStatus {
    id: number;
    code: string;
    name: string;
    is_active: string;
}

export class GetVehicleGroup {
    id: number;
    code: string;
    description: string;
    is_active: string;
}

export class GetTypePacking {
    id: number;
    code: string;
    name: string;
}

export class GetpReqEquipments {
    id: number;
    code: string;
    name: string;
    is_active: string;
}

/*------- End Mastr --------*/


/*-------  Auth --------*/

export class Login {
    id: number;
    userId: string;
    userName: string;
    thaiName: string;
    isLocal: string;
    isAd: string;
    isVendor: string;
    departmentName: string;
    roleName: string;
    hash: string;
    carrierID: string;
    carrierCode: string;
    carrierName: string;
}

/*------- End Auth --------*/

/*-------  Vendor --------*/

export class GetCarrierVehicle {
    carrier_id: number;
    vehicle_group_id: number;
    vehicle_group_code: string;
    vehicle_group_name: string;
}

export class ValueInsertUpdateTrQuotaVechicle {
    vehicleGroupId: number;
    qty: number;
    quotaVehicleId: number;
}

/*------- End Vendor --------*/

/*-------  Process --------*/
export class ProcessGetTruckAmountNoti {
    tr_Quota_vehicle_id: number;
    quota_date: string;
    carrier_id: number
    carrier_code: string
    carrier_name: string
    group_date_id: number
    groupname: string
    vehicle_group_id: number
    vehicle_group_code: string
    vehicle_group_name: string
    qty: number
    last_datetime: string
}


//--------แก้คำผิด ProcessSearch
export class ProcessSearchContainerReg {
    containner_regis_id: number;
    carrier_id: number;
    carrier_code: string;
    carrier_name: string;
    recieve_date: string;
    invoice_no_text: string;
    booinkg_No_text: string;
    container_No: string;
    seal_No: string;
    size_container: number;
    return_date: string;
    vgM_Tare: number;
    closing_datetime: string;
    etd_lcb: string;
    agent_container_id: number;
    agent_container_code: string;
    agent_container_name: string;
    pickup_at_id: number;
    pickup_at_code: string;
    pickup_at_name: string;
    pickup_return_id: number;
    pickup_return_code: string;
    pickup_return_name: string;
    is_Shipment_No_assigned: string;
    last_update_datetime: string;
    loading_date: string;
    
}


//-----------แก้ ProcessSearchContainerRegNotAssign
export class ProcessSearchContainerRegNotAssign{
    loading_date: string;
    containner_regis_id: number;
    carrier_id: number;
    carrier_code: string;
    carrier_name: string;
    recieve_date: string;
    invoice_no_text: string;
    booinkg_No_text: string;
    container_No: string;
    seal_No: string;
    size_container: number;
    return_date: string;
    vgM_Tare: number;
    closing_datetime: string;
    etd_lcb: string;
    agent_container_id: number;
    agent_container_code: string;
    agent_container_name: string;
    pickup_at_id: number;
    pickup_at_code: string;
    pickup_at_name: string;
    pickup_return_id: number;
    pickup_return_code: string;
    pickup_return_name: string;
    last_update_datetime: string;
    is_Shipment_No_assigned: string;
    
}


export class ProcessSearchstatusOverAllbyuserid {
    loading_Datetime: string;
    shipment_Type: string;
    current_status_id: string;
    current_status: string;
    shipment_No: string;
    deliver_No: string;
    invoice_No: string;
    booinkg_No: string;
    container_No: string;
    seal_No: string;
    queue_Number: string;
    item_no: string;
    mat_no: string;
    mat_desc: string;
    do_qty: string;
    do_saleunit: string;
    lot_no: string;
    qty: string;
    uom: string;
    truck_Load: string;
    customer_name: string;
    regis_confirm_datetime: string;
    queue_Call_DateTime: string;
    queue_End_DateTime: string;
    plannig_Datetime: string;
    product_preparing_Datetime: string;
    truck_Checkin_Datetime: string;
    driver_Checkin_Datetime: string;
    loading_Start_Datetime: string;
    weight_In_Datetime: string;
    labor_Register_Datetime: string;
    weight_Out_Datetime: string;
    driver_text: string;
    vehicle_text: string;
    firstname_driver: string;
    lastname_driver: string;
    dO_Loading_Confirm_Datetime: string;
    dO_Loading_Start_Datetime: string;
    dO_Loading_End_Datetime: string;
    shipment_id: string;
    dO_id: string;
    grade_id: string;
    lot_id: string;
    storage_name: string;
    dock_name: string;
    shipment_storage_name: string;
}

//---------------------- แก้  ProcessSearchCarrierQuota

export class ProcessSearchCarrierQuota {
    shipment_id: number;
    shipment_No: string;    
    deliver_No: string;
    invoice_No: any;
    booking_No: any;
    closing_time: any;
    mat_no: string;
    qty: any;
    truck_Load: number;
    vehicle_group_desc: any;
    shipments_link_id: any;
    isStat: any;
    req_qequipments: any;
    type_packing_name: any;
    remark: any;
    pick_up_at: any;
    return_to: any;
    route_name: any;
    isOutside: any;
    total_worker: any;
    planning_Datetime: any;

}

export class ProcessSearchWarehouseConfirmByItem {
    loading_date: Date;
    dc: any;
    planning_time: Date;
    prepairing_time: any;
    shipment: string;
    delivery_no: string;
    grade: string;
    delivery_qty: number;
    truck_load: number;
    customer_lot_no: string;
    lot_no_from_wms: string;
    new_lot_from_lo: string;
    invoice_no: any;
    ship_to: string;
    sold_to: any;
    delivery_item_note: any;
    packing_remark: any;
    other_intruction: string;
    marking_remark: any;
    fumigation_remark: any;
    storage_location: any;
    product: string;
    type_loading: string;
    material_document: string;
    province: string;
}

export class ProcessSearchWarehouseConfirmByGroup {
    loading_date: Date;
    dc: any;
    planning_time: Date;
    prepairing_time: any;
    shipment: string;
    delivery_no: string;
    grade: string;
    delivery_qty: number;
    truck_load: number;
    customer_lot_no: string;
    lot_no_from_wms: string;
    new_lot_from_lo: string;
    invoice_no: any;
    ship_to: string;
    sold_to: any;
    delivery_item_note: any;
    packing_remark: any;
    other_intruction: string;
    marking_remark: any;
    fumigation_remark: any;
    storage_location: any;
    product: string;
    type_loading: string;
    material_document: string;
    province: string;
}

//----เพิ่ม ProcessGetQueList: api/v1/Process/ProcessGetQueueList
export class ProcessGetQueueList {

    shipment_no: string;
    booinkg_No: string;
    invoice_No: string;
    plannig_Datetime: string;
    storage: string;
    vehicle_group_Desc: string;
    driver_Checkin_Datetime: string;
    driver_text: string;
    vehicle_plate: string;
    queue_number: string;
}


//--------- เพิ่ม api/v1/Process/ProcessSearchCarrierQuotaStat
export class ProcessSearchCarrierQuotaStat{
    text_vendor: string;
    text_all: string;
    text_information: string;

}

//---------------เพิ่ม api/v1/Process/ProcessTruckTracking
export class ProcessTruckTracking{
    no: number;
    shipment_no: string;
    driver: string;
    vehicle: string;
    carrier_name: string;
    vehicle_status_id: number;
    vehicle_status_name: string;
    travel_in_time: string;
    truck_in_area: any;
    truck_register_time: string;
    truck_out_area: any;
    truck_arrived_feed: any;
    truck_to_customer: any;
    truck_in_late: string;
    truck_out_late: any;
    cur_lat: string;
    cur_long: string;
    speed: string;
    engine_status: string;
    gmap_link: any;

}

/*------- End Process --------*/

/*-------  ProcessCb  --------*/
export class AgentContainer {
    agentcontainerid: number;
    code: string;
    name: string;
}

export class Carrier {
    carrierid: number;
    code: string;
    name: string;
}

export class Driver {
    driverid: number;
    driveR_CODE: string;
    firsT_NAME: string;
    lasT_NAME: string;
    perS_CODE: string;
}

export class GroupDate {
    groupdateid: number;
    code: string;
    name: string;
}

export class PickupReturn {
    pickupreturnid: number;
    code: string;
    name: string;
}

export class Plant {
    plantid: number;
    code: string;
    name: string;
}

export class ReqQequipments {
    reqqequipmentsid: number;
    code: string;
    name: string;
}

export class Route {
    routeid: number;
    code: string;
    description: string;
}

export class ShipmentType {
    shipmenttypeid: number;
    code: string;
    description: string;
}

export class Status {
    currentstatusid: number;
    code: string;
    name: string;
}

//---------- เพิ่ม responseCbStorage
export class ResponseCbStorage {
    result: CbStorage[];
    message: string
}
export class Response {
    storageid: number;
    storage_code: string;
    storage_name: string;
}

export class CbStorage {
    storageid: number
    storage_code: string
    storage_name: string
}

export class StorageDock {
    stroragedockid: number;
    dock_name: string;
}

export class TypePacking {
    typepackingid: number;
    code: string;
    name: string;
}

export class Vehicle {
    vehicleid: number;
    vehicle: string;
    veH_TEXT: string;
}

// แก้ --- เพิ่ม isTail
export class VehicleGroup {
    vehiclegroupid: number;
    code: string;
    description: string;
    isTail: string;
}

export class VehicleType {
    vehicletypeid: number;
    code: string;
    description: string;
}

export class YesNo {
    yesnoid: number;
    code: string;
    name: string;
}

//-----เพิ่ม processCB/Labour
export class Labour{
    lobour_id: number;
    lobour_name: string;

}

/*------- End ProcessCb  --------*/

//----------End Class Variable------------------


//---------- Function Api ---------------------

/*-------Api Get---------*/

//*******Master*********

export interface ResponseGetGroupDate {
    result: GetGroupDate[];
    message: string;
}

export interface ResponseGetPickupReturn {
    result: GetPickupReturn[];
    message: string;
}

export interface ResponseGetAgentContainer {
    result: GetAgentContainer[];
    message: string;
}

export interface ResponseGetPlant {
    result: GetPlant[];
    message: string;
}

export interface ResponseGetStorage {
    result: GetStorage[];
    message: string;
}

export interface ResponseGetShipmentType {
    result: GetShipmentType[];
    message: string;
}

export interface ResponseGetStatus {
    result: GetStatus[];
    message: string;
}

export interface ResponseGetVehicleGroup {
    result: GetVehicleGroup[];
    message: string;
}

export interface ResponseGetTypePacking {
    result: GetTypePacking[];
    message: string;
}

export interface ResponseGetpReqEquipments {
    result: GetpReqEquipments[];
    message: string;
}
//*******End Master*********

//*******Auth*********

export interface SendLogin {
    userId: string;
    hash: string;
}

export interface ResponseLogin {
    result: Login;
    message: string;
}

//*******End Auth*********

//*******Vendor*********

export interface ResponseGetCarrierVehicle {
    result: GetCarrierVehicle[];
    message: string;
}

export interface ResponseDeleteTrQuotaVechicle {
    result: string;
    message: string;
}

export interface SendDeleteTrQuotaVechicle {
    userId: number;
    id: number;
}

export interface ResponseDeleteProcessTrContainnerRegis {
    result: string;
    message: string;
}

export interface SendDeleteProcessTrContainnerRegis {
    userId: number;
    id: number;
}

export interface ResponseProcessAssignVendorQuota {
    result: string;
    message: string;
}

export interface SendProcessAssignVendorQuota {
    shipmentId: number;
    planingDatetime: string;
    carrierId: number;
    vehicleGroupId: number;
    shipmentLink: string;
    isStat: string;
    ireqEQP: number;
    isOutside: string;
    shipmentRouteId: number;
    typePackingId: number;
    userId: number;
}

export interface ResponseProcessClearandReturnAssignVendorQuota {
    result: string;
    message: string;
}

export interface SendProcessClearandReturnAssignVendorQuota {
    shipmentId: number;
    carrierId: number;
    userId: number;
}

export interface ResponseInsertUpdateTrQuotaVechicle {
    result: string;
    message: string;
}

export interface SendInsertUpdateTrQuotaVechicle {
    quotaDate: string;
    carrierId: number;
    groupDateId: number;
    userId: number;
    value: ValueInsertUpdateTrQuotaVechicle[];
}

export interface ResponseInsertUpdateProcessTrContainnerRegis {
    result: string;
    message: string;
}

export interface SendInsertUpdateProcessTrContainnerRegis {
    containnerRegisId: number;
    carrierId: number;
    recieveDate: string;
    containerNo: string;
    sealNo: string;
    vgmTare: number;
    sizeContainer: number;
    agentContainerId: number;
    pickupRreturnId: number;
    closingDatetime: string;
    etdLcb: string;
    returnDate: string;
    invoiceNoText: string;
    booinkgNoText: string;
    userId: number;
}

//*******End Vendor*********

//*******Process*********
export interface ResponseProcessGetTruckAmountNoti {
    result: ProcessGetTruckAmountNoti[];
    message: string;
}

export interface ResponseProcessSearchContainerReg {
    result: ProcessSearchContainerReg[];
    message: string;
}


//==========เพิ่ม ResponseProcessSearchContainerRegNotAssign
export interface ResponseProcessSearchContainerRegNotAssign {
    result: ProcessSearchContainerRegNotAssign[];
    message: string;
}

//=============เพิ่ม ResponseProcessSearchCarrierQuotaStat
export interface ResponseProcessSearchCarrierQuotaStat{
    result: ProcessSearchCarrierQuotaStat[];
    message: string;
}


export interface ResponseProcessSearchstatusOverAllbyuserid {
    header: [];
    result: [];
    // result: ProcessSearchstatusOverAllbyuserid[];
    message: string;
}

//--------------เพิ่ม ResponseProcessSearchLabour
export interface ResponseProcessSearchLabour {
    result: ProcessSearchLabour[];
    message: string;
}

//------------เพิ่ม processSearchLabour
export interface ProcessSearchLabour {
    shipemnt_type: string;
    vehicle_text: string;
    storage: any;
    storage_id: any;
    dock: any;
    shipment_no: number;
    shipment_id: number;
    delivery_no: string;
    delivery_id: number;
    grade: string;
    qty: number;
    isforklift: any;
    labor_id1: any;
    labor_id2: any;
}

export interface SendProcessSearchstatusOverAllbyuserid {
    userId: number,
    invoiceNo: string,
    shipmentNo: string,
    deliveryNo: string,
    loadingDate: string,
    storageList: string,
    plantList: string,
    // ------แก้ type
    shipmentTypeId: string,
    currentStatusId: string
}

export interface ResponseProcessSearchCarrierQuota {
    result: ProcessSearchCarrierQuota[];
    message: string;
}

export interface ResponseProcessSearchWarehouseConfirmByItem {
    result: ProcessSearchWarehouseConfirmByItem[];
    message: string;
}


export interface ResponseProcessSearchWarehouseConfirmByGroup {
    result: ProcessSearchWarehouseConfirmByGroup[];
    message: string;
}

//เพิ่ม ------ responseProcessGetQueueList
export interface ResponseProcessGetQueueList {
    result: ProcessGetQueueList[];
    message: string;
}

//เพิ่ม ============ responseProcessTruckTracking
export interface ResponseProcessTruckTracking{
    result: ProcessTruckTracking[];
    message: string;
}

//*******End Process*********

//******* ProcessCb*********
export interface ResponseAgentContainer {
    result: AgentContainer[];
    message: string;
}

export interface ResponseCarrier {
    result: Carrier[];
    message: string;
}

export interface ResponseDriver {
    result: Driver[];
    message: string;
}

export interface ResponseGroupDate {
    result: GroupDate[];
    message: string;
}

export interface ResponsePickupReturn {
    result: PickupReturn[];
    message: string;
}

export interface ResponsePlant {
    result: Plant[];
    message: string;
}

export interface ResponseReqQequipments {
    result: ReqQequipments[];
    message: string;
}

export interface ResponseRoute {
    result: Route[];
    message: string;
}

export interface ResponseShipmentType {
    result: ShipmentType[];
    message: string;
}

export interface ResponseStatus {
    result: Status[];
    message: string;
}

export interface ResponseStorage {
    result: CbStorage[];
    message: string;
}

export interface ResponseStorageDock {
    result: StorageDock[];
    message: string;
}

export interface ResponseTypePacking {
    result: TypePacking[];
    message: string;
}

export interface ResponseVehicle {
    result: Vehicle[];
    message: string;
}

export interface ResponseVehicleGroup {
    result: VehicleGroup[];
    message: string;
}

export interface ResponseVehicleType {
    result: VehicleGroup[];
    message: string;
}

export interface ResponseYesNo {
    result: YesNo[];
    message: string;
}

//-----------เพิ่ม ResponseLabour
export interface ResponseLabour{
    result: Labour[];
    message: string;
}

//*******End ProcessCb*********

//----------End Function Api ------------------