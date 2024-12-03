<?php

namespace App\Http\Controllers;

use App\Exports\AdmissionExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Excel;
use Mail;
use App\Mail\NotifyMail;
use App\Models\Admissions;
class AdmissionWebController extends Controller
{
    //

    public function index()
    {
        $admissions = Admissions::all();
        return view('admin.admissions.index')->with('admissions',$admissions);
    }


    public function store(request $Request)
    {

        $latest = Admissions::latest()->first();
        $sr_no = $latest?"thcc-" .   date("Y") . "-" . ($latest->id +1): "thcc-". date("Y") . "-1";

        

        // generate SR number




     
        if($Request->hasFile('picture'))
        {
            $profile = $Request->picture;
            $originalName = $Request->picture->getClientOriginalName() . Date('Y-m-d');
            
            $Request->merge(['profilePicture' => $originalName]);
            
            $destinationPath = 'public/uploads';
            $profile->move($destinationPath,$originalName);
        }

        if($Request->hasfile('birth_certificate'))
        {
            $profile = $Request->birth_certificate;
            $originalName = $Request->birth_certificate->getClientOriginalName() . Date('Y-m-d');
            
            $Request->merge(['birthPicture' => $originalName]);
            
            $destinationPath = 'public/uploads';
            $profile->move($destinationPath,$originalName);
        }


        
        $Request->merge(['sr_number' => $sr_no]);
        
        $admissions = Admissions::insert(
            $Request->all()
        );

        $data = $Request->all();

        Mail::to(['abdulmaroofyousfani5@gmail.com','abdulmaroofy@gmail.com'])->send(new NotifyMail($data));            
        return response()->json(['message' => "Successfully Submitted"], 200);
    }

    public function export($id)
    {
        return \Maatwebsite\Excel\Facades\Excel::download(new AdmissionExport($id), 'user.xls');
        
    }
}
