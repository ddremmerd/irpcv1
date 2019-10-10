# IRPCversion1

## Update: progress

**TABLE: COMPONENT**

| Page | Component | **<span class="colour" style="color:rgb(34, 34, 34)">**✔**</span>** | date |
| ---- | --------- | --- | ---- |
| ldlt1 | DD: type | **<span class="highlight" style="background-color:rgb(255, 255, 255)"><span class="colour" style="color:rgb(34, 34, 34)"><span class="font" style="font-family:Arial"><span class="size" style="font-size:10.5pt">✔</span></span></span></span>** | 10-10-19 |
|  | DD: งานผู้ขนส่ง | **<span class="highlight" style="background-color:rgb(255, 255, 255)"><span class="colour" style="color:rgb(34, 34, 34)"><span class="font" style="font-family:Arial"><span class="size" style="font-size:10.5pt">✔</span></span></span></span>** | 10-10-19 |
|  | DD: สถานะ | **<span class="highlight" style="background-color:rgb(255, 255, 255)"><span class="colour" style="color:rgb(34, 34, 34)"><span class="font" style="font-family:Arial"><span class="size" style="font-size:10.5pt">✔</span></span></span></span>** | 10-10-19 |
|  | info: part1 |  |  |
|  | info: all info |  |  |
|  | info: remarks |  |  |
|  | input box: shipment no., booking No., car license |  |  |
|  | table | **<span class="highlight" style="background-color:rgb(255, 255, 255)"><span class="colour" style="color:rgb(34, 34, 34)"><span class="font" style="font-family:Arial"><span class="size" style="font-size:10.5pt">✔</span></span></span></span>** | 10-10-19 |
|  | DD(for sort): status |  |  |
|  | DD (for search): date from |  |  |
|  | DD (for search): date to |  |  |
|  | button:  ส่ง quota | **<span class="highlight" style="background-color:rgb(255, 255, 255)"><span class="colour" style="color:rgb(34, 34, 34)"><span class="font" style="font-family:Arial"><span class="size" style="font-size:10.5pt">✔</span></span></span></span>** | 10-10-19 |
|  | button: ลบ | **<span class="highlight" style="background-color:rgb(255, 255, 255)"><span class="colour" style="color:rgb(34, 34, 34)"><span class="font" style="font-family:Arial"><span class="size" style="font-size:10.5pt">✔</span></span></span></span>** | 10-10-19 |
| ldlt 2 (ระบบติดตามรถบรรทุก) | รอคอนเฟิร์มจากพี่โจ้ |  |  |
| ldlt 3 (ระบบจัดการคิว) | table | **<span class="highlight" style="background-color:rgb(255, 255, 255)"><span class="colour" style="color:rgb(34, 34, 34)"><span class="font" style="font-family:Arial"><span class="size" style="font-size:10.5pt">✔</span></span></span></span>** | 9-10-19 |
|  | DD: WH | **<span class="highlight" style="background-color:rgb(255, 255, 255)"><span class="colour" style="color:rgb(34, 34, 34)"><span class="font" style="font-family:Arial"><span class="size" style="font-size:10.5pt">✔</span></span></span></span>** | 9-10-19 |
| ldlt 4 (ทะเบียนรถตู้) | table | **<span class="highlight" style="background-color:rgb(255, 255, 255)"><span class="colour" style="color:rgb(34, 34, 34)"><span class="font" style="font-family:Arial"><span class="size" style="font-size:10.5pt">✔</span></span></span></span>** |  |

<br>
<br>
<br>
Passing Data Method:

<span class="colour" style="color:rgb(0, 0, 0)">**1 child component**</span>
<span class="colour" style="color:rgb(0, 0, 0)">**2 parent component**</span>

<span class="colour" style="color:rgb(0, 0, 0)">**child component.ts: @input ตัวแปร global ที่จะรับค่ามา**</span>
<span class="colour" style="color:rgb(0, 0, 0)">**child component.html: “let XXX of global (ที่ประกาศใน @input)” = {{XXX}}**</span>

<span class="colour" style="color:rgb(0, 0, 0)">**parent component.html: \<app [global] = “ตัวแปรที่ต้องการ pass”>\</app>**</span>

<span class="colour" style="color:rgb(0, 0, 0)">**parent component.ts: ประกาศตัวแปรที่ต้องการ pass = [ “    ”, “ ” ]**</span>