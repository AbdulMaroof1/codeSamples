<?php

namespace App\Exports;

use App\Models\Admissions;
use Maatwebsite\Excel\Concerns\FromCollection;

class AdmissionExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public $recordId;
    public function __construct($recordId)
    {
        $this->recordId = $recordId;
    }
    public function collection()
    {
        $data = Admissions::find($this->recordId);
       
        return $data;
    }
}
