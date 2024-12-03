<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admissions;
use Illuminate\Http\Request;
use PDF;
use TheSeer\Tokenizer\Exception;
use Mail;
use App\Mail\NotifyMail;

class AdmissionController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index()
    {
        $admissions = Admissions::all();
        return view('admin.admissions.index')->with('admissions',$admissions);
    }
    public function store(Request $Request)
    {
        
        try
        {
            $admissions = Admissions::insert(
                $Request->all()
            );

            $data = $Request->all();

            Mail::to('abdulmaroofyousfani5@gmail.com')->send(new NotifyMail($data));            
            return response()->json(['message' => "Successfully Submitted"], 200);

        }
        catch(Exception $e)
        {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        
    }

    public function generatePDF($id)
    {
        $admission = Admissions::find($id)->toArray();  

        $pdf = PDF::loadView('admin.admissions.pdf2', $admission);
    
        return $pdf->download('admissionform.pdf');
    }

    public function show($id)
    {
        $admission = Admissions::find($id);
        return view('admin.admissions.view')->with('admission',$admission);
    }

    public function create()
    {
        return view('admin.admissions.create');
    }


}
